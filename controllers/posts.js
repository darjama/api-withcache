var express = require('express');
var router = express.Router();
var fetchPosts = require('../models/model.js');

router.get('/', (req, res) => {
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
  fetchPosts(req, x => res.status(200).json({posts: x}));
})

module.exports = router;