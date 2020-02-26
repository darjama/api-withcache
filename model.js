var express = require("express");
var app = express();
var fetch = require("node-fetch");

var fetchPosts = function(req, callback) {
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
  .then( results =>
    callback(results));
}

module.exports = fetchPosts;