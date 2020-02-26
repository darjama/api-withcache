var express = require("express");
var fetch = require("node-fetch");
var app = express();
var ping = require("./ping");
var posts = require("./posts");
var port = 3333;

app.set("json spaces", 2);

app.use('/api/ping', ping);
app.use('/api/posts', posts)
//Route 2: Get Posts


app.listen(port, () => {
 console.log(`Server started on port ${port} at ${Date()}`);
});