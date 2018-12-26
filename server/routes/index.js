var express = require('express');
var path = require('path');
var router = express.Router();
var qs = require('querystring');
var rs = require('randomstring');
const axios = require('axios');
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
    scope: 'user:email',
  });

  const githubAuthUrl = url + query;
  res.send(githubAuthUrl)
});

router.get('/githublogin', function(req, res, next) {
  const returncode = req.query.code;
  const returnstate = req.query.state;

  if(state !== returnstate) {
    res.send(false);
  }

  const host = 'https://github.com/login/oauth/access_token?'
  const queryString = qs.stringify({
    client_id: client.CLIENT_ID,
    client_secret: client.CLIENT_SECRET,
    code: returncode,
    redirect_uri: client.HOST + 'githublogin',
    state: state,
  })
  const authurl = host + queryString;

  let access_token = '';

  axios.post(authurl)
  .then(function(res) {
    access_token = qs.parse(res.data);
  })
  .catch(function(err) {
    console.log(err)
  })

  const config = {
    headers: {
      Authorization: 'token ' + access_token,
      'User-Agent': 'Login-App'
    }
  }
  axios.get('https://api.github.com/user/public_emails', config)
  .then(function(res) {
    res.send(res.data)
  })
  .catch(function(err) {
    console.log(err)
  })

  res.send(false)
});

module.exports = router;