var express = require("express");
var app = express();
var ping = require("../controllers/ping");
var posts = require("../controllers/posts");
var apicache = require('apicache');
var port = 3000;

var cache = apicache.options({trackPerformance: true}).middleware;

app.set("json spaces", 2);

app.use('/api/ping', ping);
app.use('/api/posts', cache('30 minutes'), posts);
app.get('/api/cache/index', function(req,res,next){
  res.send(apicache.getIndex())
})
app.get('/api/cache/performance', (req, res) => {
  res.json(apicache.getPerformance())
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
  console.log(`Server started on port ${port} at ${Date()}`);
  });
}

module.exports = app;