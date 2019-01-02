var express = require('express');
var router = express.Router();
var qs = require('querystring');
var rs = require('randomstring');
const axios = require('axios');
var Client = require('../client').client;

const client = Client()
let state;

router.get('/', function(req, res, next) {
    state = rs.generate();

    const url = 'https://github.com/login/oauth/authorize?';
    const query = qs.stringify({
        client_id: client.GITHUB_CLIENT_ID,
        redirect_uri: client.HOST + 'githublogin',
        state: state,
        scope: 'user:email',
    });

    const githubAuthUrl = url + query;
    res.send(githubAuthUrl)
});

router.get('/login', function(req, res, next) {
    const returncode = req.query.code;
    const returnstate = req.query.state;

    if(state !== returnstate) {
        res.send(false);
    }

    const host = 'https://github.com/login/oauth/access_token?'
    const queryString = qs.stringify({
        client_id: client.GITHUB_CLIENT_ID,
        client_secret: client.GITHUB_CLIENT_SECRET,
        code: returncode,
        redirect_uri: client.HOST + 'githublogin',
        state: state,
    })
    const authurl = host + queryString;

    axios.post(authurl)
    .then(function(resp) {
        const token = qs.parse(resp.data).access_token;
        res.send(token)
    })
    .catch(function(err) {
        console.log(err);
    })
});

router.get('/user', function(req, res, next) {
    const config = {
        headers: {
            Authorization: 'token ' + req.query.token,
            'User-Agent': 'Login-App'
        }
    }
    axios.get('https://api.github.com/user/public_emails', config)
    .then(function(resp) {
        res.send(resp.data[0].email);
    })
    .catch(function(err) {
        console.log(err)
    })
});

module.exports = router;