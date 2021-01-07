var express = require('express');
var router = express.Router();
var test = require('../test.json');

/* GET index page. */
router.get('/', function(req, res, next) {
  //json data보내기
  res.send(test);
});

module.exports = router;
