var express = require('express');
var path = require('path');
var router = express.Router();
var qs = require('querystring');
var rs = require('randomstring');
var Client = require('../client').client;

const client = Client()

router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
});

router.get('/github', function(req, res, next) {
  req.session.csrf_string = rs.generate();
  const githubAuthUrl =
    'https://github.com/login/oauth/authorize?' +
    qs.stringify({
      client_id: client.CLIENT_ID,
      redirect_uri: client.HOST + 'redirect',
      state: req.session.csrf_string,
      scope: 'user:email'
    });
  res.redirect(githubAuthUrl);  
})

module.exports = router;