/**
 * Wikilipsum - Fetch a random article from Wikipedia and store it as a jekyll article.
 *
 * itamar@gizra.com
 */

var request = require("request");
var htmlToText = require("html-to-text");
var fs = require("fs");

var options = {
  headers: {'User-Agent': 'Wikilipsum'},
  json:true
};

options["url"] = "http://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=1";
request(options, function (error, response, body) {
  var pageId = body.query.random[0].id;
  options["url"] = "http://en.wikipedia.org/w/api.php?action=parse&prop=text&format=json&pageid=" + pageId;
  request(options, function (error, response, body) {

    var permalink = body.parse.title.toLowerCase().replace(/\W/g, '-').replace(/-+/g, '-');

    var content = htmlToText.fromString(body.parse.text["*"], {tables: true});

    content = content.replace(/\[.+\]/g, "");
    content = content.replace(/\/wiki\/File.+\.\w\w\w/g, "");
    var page = "---\n";
    page += "layout: post\n";
    page += 'title: "' + body.parse.title + '"\n';
    page += 'permalink: /' + permalink + '\n';
    page += "---\n";
    page += content;

    var date = new Date().toISOString().substring(0, 10);
    fs.writeFile('../_posts/' + date + '-' + permalink + '.md', page);
  });
});
