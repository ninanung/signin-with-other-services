const express = require('express');
const axios = require('axios');
const router = express.Router();
const qs = require('querystring');
const Client = require('../client.js').client;
const client = Client();

router.get('/', function(req, res, next) {

});

module.exports = router;