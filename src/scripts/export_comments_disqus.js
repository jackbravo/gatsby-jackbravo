const Database = require('better-sqlite3');
const fs = require('fs');

if (process.argv.length < 3) {
  usage();
  process.exit();
}

const db = new Database(process.argv[2], {readonly: true});

const rows = db.prepare(`SELECT n.nid, n.title, n.created, b.body_value, n.status,
  c.cid, c.pid, c.name, c.mail, c.created created_comment, c.homepage, c.hostname, c.subject, cb.comment_body_value
  FROM node n
  INNER JOIN field_data_body b ON b.entity_id = n.nid
  INNER JOIN comment c ON c.nid = n.nid AND c.status = 1
  INNER JOIN field_data_comment_body cb ON cb.entity_id = c.cid
  ORDER BY n.nid, c.cid`).all();

console.log(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dsq="http://www.disqus.com/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.0/"
>
  <channel>`);
let previous_slug = '';
rows.forEach(row => {
  const slug = slugify(row.title);
  const date = new Date(row.created * 1000);
  const date_comment = new Date(row.created_comment * 1000);
  if (slug != previous_slug) {
    if (previous_slug != '') {
      console.log(`</item>`);
    }
    console.log(`<item>
      <title>${row.title}</title>
      <link>http://joaquin.axai.mx/${slug}</link>
      <content:encoded><![CDATA[${row.body_value}]]></content:encoded>
      <dsq:thread_identifier>${row.nid}</dsq:thread_identifier>
      <wp:post_date_gmt>${getDisqusDate(date)}</wp:post_date_gmt>
      <wp:comment_status>open</wp:comment_status>`);
    previous_slug = slug;
  }

  console.log(`
    <wp:comment>
      <wp:comment_id>${row.cid}</wp:comment_id>
      <wp:comment_author>${row.name}</wp:comment_author>
      <wp:comment_author_email>${row.mail}</wp:comment_author_email>
      <wp:comment_author_url>${row.homepage}</wp:comment_author_url>
      <wp:comment_author_IP>${row.hostname}</wp:comment_author_IP>
      <wp:comment_date_gmt>${getDisqusDate(date_comment)}</wp:comment_date_gmt>
      <wp:comment_content><![CDATA[${row.comment_body_value}]]></wp:comment_content>
      <wp:comment_approved>1</wp:comment_approved>
      <wp:comment_parent>${row.pid}</wp:comment_parent>
    </wp:comment>
  `)
});
console.log(`</item></channel></rss>`);

db.close();

function usage() {
  const path = require('path');
  const scriptName = path.basename(__filename);
  console.log('node ' + scriptName + ' <database.sqlite>');
}

function getDisqusDate(date) {
  return date.toISOString().slice(0, 10) + ' ' + date.toISOString().slice(11, 19);
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
