var express = require("express");
var fetch = require("node-fetch");
var app = express();
var port = 3333;

app.set("json spaces", 2);

//Route 1: Ping
app.get('/api/ping', (req, res, next) => {
  res.status(200)
    .json({
    success: true
   });
});

//Route 2: Get Posts
app.get('/api/posts', (req, res, next) => {
  const sortByValidation = ['id', 'reads', 'likes', 'popularity'];
  const directionValidation = ['asc', 'desc'];
  if (!req.query.tags || req.query.tags === '') {
    res.status(400)
      .json({
      error: "Tags parameter is required"
    })
    return;
  }
  if (req.query.sortBy && sortByValidation.indexOf(req.query.sortBy) === -1) {
    res.status(400)
      .json({
      "error": "sortBy parameter is invalid"
    })
    return;
  }
  if (req.query.direction && directionValidation.indexOf(req.query.direction) === -1) {
    res.status(400)
      .json({
      "error": "direction parameter is invalid"
    })
    return;
  }

  var tagsParsed = req.query.tags.split(',');
  var sortBy;
  req.query.sortBy ? sortBy = req.query.sortBy : sortBy = 'id';
  var aGTB = 1; //for sortation a greater than b
  var aLTB = -1; //for sortation, a less than b
  if (req.query.direction === 'desc') {
    aGTB = -1;
    aLTB = 1;
  }
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
      .catch(err => new Error())
      )

  }

  Promise.all(resultArr).then(function() {
    return result.sort((a,b) => {
      if (a[sortBy] > b[sortBy]) {
        return aGTB;
      }
      if (a[sortBy] === b[sortBy]) {
        return 0;
      }
      return aLTB;
    })
  })
  .then( function(results) {
    res.status(200)
      .json({posts: results})
      .end();
  })
})

app.listen(port, () => {
 console.log(`Server started on port ${port} at ${Date()}`);
});