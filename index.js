var express = require("express");
var fetch = require('node-fetch');
var Promise = require("bluebird");
fetch.Promise = Promise;
var app = express();
var port = 3333;

//Route 1: Ping
app.get('/api/ping', (req, res, next) => {
  res.send({
    "success": true
   });
  res.end(200);
})

//Route 2: Get Posts
const sortByValidation = ['id', 'reads', 'likes', 'popularity'];
const directionValidation = ['asc', 'desc'];

app.get('/api/posts', (req, res, next) => {
  if (!req.query.tags || req.query.tags === '') {
    res.send({
      "error": "Tags parameter is required"
    });
    res.end(400);
    return;
  }
  if (req.query.sortBy && sortByValidation.indexOf(req.query.sortBy) === -1) {
    res.send({
      "error": "sortBy parameter is invalid"
    });
    res.end(400);
    return;
  }
  if (req.query.direction && directionValidation.indexOf(req.query.direction) === -1) {
    res.send({
      "error": "direction parameter is invalid"
    });
    res.end(400);
    return;
  }

  var tagsParsed = req.query.tags.split(',');
  var result = []; //collected records returned from API
  var resultIds = []; //ids collected to prevent duplicates; not used for single tag
  var resultArr=[]; //array of promises returned when fetching records
  for (let i = 0; i < tagsParsed.length; i ++) {
    resultArr.push(
    fetch('https://hatchways.io/api/assessment/blog/posts?tag=' + tagsParsed[i])
      .then(response => response.json())
      .then(data => {
        if (tagsParsed.length === 1) {
          result = data.posts;
        } else {
          for (var j = 0; j < data.posts.length; j++) {

            if (resultIds.indexOf(data.posts[j].id === -1)) {
              resultIds.push(data.posts[j].id);
              result.push(data.posts[j]);
            }
          }
        }
      })
      )

  }

  Promise.all(resultArr).then( function() {
    res.send({posts: result});
    res.end(200);
  })
})

app.listen(port, () => {
 console.log(`Server started on port ${port} at ${Date()}`);
});