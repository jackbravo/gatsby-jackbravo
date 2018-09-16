const Database = require('better-sqlite3');
const fs = require('fs');
const http = require('http');

if (process.argv.length < 3) {
  usage();
  process.exit();
}

const db = new Database(process.argv[2], {readonly: true});

const rows = db.prepare(`SELECT n.nid, n.title, n.created, b.body_value, n.status FROM node n
  INNER JOIN field_data_body b ON b.entity_id = n.nid`).all();
rows.forEach(row => {
  const slug = slugify(row.title);
  const folder = row.status ? '/../pages/' : '/../../drafts/';
  const path = __dirname + folder + slug;
  const date = new Date(row.created * 1000);

  const aliases = db.prepare(`SELECT alias FROM url_alias
    WHERE source = ? AND alias != ?`)
    .pluck()
    .all('node/' + row.nid, slug);

  const tags = db.prepare(`SELECT td.name FROM taxonomy_index ti
    INNER JOIN taxonomy_term_data td ON td.tid = ti.tid AND ti.nid = ?
    WHERE ti.tid NOT IN (SELECT tid FROM taxonomy_index GROUP BY tid HAVING count(nid) = 1)`)
    .pluck()
    .all(row.nid);

  let image = db.prepare(`SELECT filename, uri FROM field_data_field_image i
    INNER JOIN file_managed f ON f.fid = i.field_image_fid
    WHERE i.entity_id = ?`).get(row.nid);
  if (image) {
    image.uri = image.uri.replace('public://', 'http://joaquin.axai.mx/files/');
  }

  fs.mkdir(path, (err) => { });
  const file = fs.createWriteStream(path + '/index.md', { flags: 'w' });
  // This is here incase any errors occur
  file.on('open', function () {
    file.write('---\n');
    file.write('title: "' + row.title + '"\n');
    file.write('date: "' + date.toISOString() + '"\n');
    file.write('aliases: ' + JSON.stringify(aliases) + '\n');
    file.write('tags: ' + JSON.stringify(tags) + '\n');
    file.write('---\n\n');
    if (image) {
      download(image.uri, path + '/' + image.filename);
      file.write(`![${image.filename}](./${image.filename})\n\n`);
    }
    file.write(row.body_value);
    file.end();
  });
  console.log(date, slug, JSON.stringify(aliases));
});

db.close();

function usage() {
  const path = require('path');
  const scriptName = path.basename(__filename);
  console.log('node ' + scriptName + ' <database.sqlite>');
}

function download(url, dest, callback) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(callback);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (callback) cb(err.message);
  });
};

function slugify(string) {
  const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
  const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with ‘and’
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple — with single -
    .replace(/^-+/, '') // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
}
