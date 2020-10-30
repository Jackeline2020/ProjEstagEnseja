var express = require('express');
var router = express.Router();

router.get('/index', function(req, res, next) {
  let params = {
    active: { home: true }
  };
  res.render('index', params);
});

router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/myskills', function(req, res, next) {
  res.render('mySkills');
});

module.exports = router;