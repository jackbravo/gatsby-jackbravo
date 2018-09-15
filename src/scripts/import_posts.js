const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

if (process.argv.length < 3) {
  usage();
  process.exit();
}

let db = new sqlite3.Database(process.argv[2], sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    return console.error(err.message);
  }
});

db.each('SELECT n.nid, n.title, n.created, b.body_value FROM node n ' +
  'INNER JOIN field_data_body b ON b.entity_id = n.nid LIMIT 4', (err, row) => {
  if (err) {
    console.error('Error at each SELECT nid', err.message);
  }
  const slug = slugify(row.title);
  const path = __dirname + '/../pages/' + slug;
  const date = new Date(row.created * 1000);
  let aliases = [];
  db.each('SELECT alias FROM url_alias WHERE source = \'node/' + row.nid + '\'', (err, row) => {
    if (err) {
      console.error('Error at each SELECT alias', err.message);
      return;
    }
    aliases.push(row.alias);
  }, (err, count) => {
    if (err) {
      console.error('Error at complete SELECT alias', err.message);
      return;
    }
    fs.mkdir(path, (err) => {
      if (err) {
        console.log(path, ' already exists');
      }
      const file = fs.createWriteStream(path + '/index.md', { flags: 'w' });
      file.write('---\n');
      file.write('title: ' + row.title + '\n');
      file.write('date: "' + date.toISOString() + '"\n');
      file.write('aliases: ' + JSON.stringify(aliases) + '\n');
      file.write('---\n\n');
      file.write(row.body_value);
      file.end();
    });
    console.log(aliases, date, slugify(row.title));
  })
});

function usage() {
  const path = require('path');
  const scriptName = path.basename(__filename);
  console.log('node ' + scriptName + ' <database.sqlite>');
}

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
