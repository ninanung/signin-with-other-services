var express = require('express');
var path = require('path');
var router = express.Router();
var qs = require('querystring');
var rs = require('randomstring');
var Client = require('../client').client;

const client = Client()

router.get('/', function (req, res, next) {
  res.sendFile(path.join('../dist/test.html'))
});

router.get('/github', function(req, res, next) {
  const url = 'https://github.com/login/oauth/authorize?' 
  const query = qs.stringify({
    client_id: client.CLIENT_ID,
    redirect_uri: client.HOST + 'redirect',
    state: rs.generate(),
    scope: 'user:email'
  });
  const githubAuthUrl = url + query;
  res.send(githubAuthUrl)
})

module.exports = router;