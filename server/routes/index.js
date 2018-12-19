var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
});

router.get('githublogin', function(req, res, next) {
  
})

module.exports = router;