var express = require('express');
var path = require('path');
var router = express.Router();
var qs = require('querystring');
var rs = require('randomstring');
var Client = require('../client').client;

const client = Client()
let state;

router.get('/', function (req, res, next) {
  res.sendFile(path.join('../dist/test.html'))
});

router.get('/github', function(req, res, next) {
  state = rs.generate();

  const url = 'https://github.com/login/oauth/authorize?';
  const query = qs.stringify({
    client_id: client.CLIENT_ID,
    redirect_uri: client.HOST + 'githublogin',
    state: state,
    scope: 'user:email'
  });

  const githubAuthUrl = url + query;
  res.send(githubAuthUrl)
});

router.get('/githublogin', function(req, res, next) {
  const returncode = req.query.code;
  const returnstate = req.query.state;
  console.log(returncode)
  console.log(returnstate)
  if(state === returnstate) {
    console.log('yes');
  }
});

module.exports = router;