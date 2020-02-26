var express = require("express");
var app = express();
var ping = require("./ping");
var posts = require("./posts");
var port = 3000;

app.set("json spaces", 2);

app.use('/api/ping', ping);
app.use('/api/posts', posts);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
  console.log(`Server started on port ${port} at ${Date()}`);
  });
}

module.exports = app;