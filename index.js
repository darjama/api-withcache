var express = require("express");
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

  res.send({
    "success": true
   });
   res.end(200);
})

app.listen(port, () => {
 console.log(`Server started on port ${port} at ${Date()}`);
});