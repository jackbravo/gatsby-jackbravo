# Joaquin's blog
Based on Gatsby starter for creating a blog

Run this blog locally by running from your CLI:

```
npm install
npm run dev
```

To publish updates just run `npm run deploy`.

The only different this on this blog is on `src/scripts` where I have 2 scripts. One for creating static pages out from a drupal7 or backdrop database on sqlite. The other to export your comments to a disqus xml file. Use them like this:

```
node src/scripts/import_posts.js ../path_to_db.sqlite
node src/scripts/export_comments_disqus.js ../path_to_db.sqlite > ../comments.xml
```

To get the sqlite database I used [mysql2sqlite](https://github.com/dumblob/).
