var express = require('express');
var router = express.Router();

router.get('/index', function(req, res, next) {
  let params = {
    active: { home: true }
  };
  res.render('index', params);
});

router.get('/skills', function(req, res, next) {
  res.render('skills');
});

router.get('/', function(req, res, next) {
  res.render('login');
});

module.exports = router;