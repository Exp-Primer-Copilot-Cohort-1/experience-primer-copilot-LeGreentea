// create web server
// run: node comments.js
// open browser and go to http://localhost:3000
// to stop running: ctrl+c

var http = require('http');
var url = require('url');
var fs = require('fs');

var comments = [];

var server = http.createServer(function(req, res) {
  var url_parts = url.parse(req.url);
  console.log(url_parts);
  switch (url_parts.pathname) {
    case '/':
      fs.readFile('./comments.html', function(err, data) {
        res.end(data);
      });
      break;
    case '/comments':
      if (req.method == 'POST') {
        var reqBody = '';
        req.on('data', function(data) {
          reqBody += data;
        });
        req.on('end', function() {
          var comment = JSON.parse(reqBody);
          comments.push(comment);
          res.end();
        });
      } else if (req.method == 'GET') {
        var commentsToReturn = [];
        var query = url_parts.query;
        if (query != '') {
          var commentsQuery = JSON.parse(query);
          for (var i = 0; i < comments.length; i++) {
            var comment = comments[i];
            if (comment.name == commentsQuery.name) {
              commentsToReturn.push(comment);
            }
          }
        } else {
          commentsToReturn = comments;
        }
        res.setHeader('Content-Type', 'text/plain');
        res.end(JSON.stringify(commentsToReturn));
      }
      break;
    case '/comments.html':
      fs.readFile('./comments.html', function(err, data) {
        res.end(data);
      });
      break;
    case '/comments.css':
      fs.readFile('./comments.css', function(err, data) {
        res.end(data);
      });
      break;
    case '/comments.js':
      fs.readFile('./comments.js', function(err, data) {
        res.end(data);
      });
      break;
    default:
      res.statusCode = 404;
      res.end('Not found');
  }
});

server.listen(3000, function() {
  console.log('Server running on port 3000');
});