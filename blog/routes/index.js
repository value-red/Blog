var express = require('express');
var router = express.Router();
const util = require('../util/readFile');
const path = require('path');
var mongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://localhost:27017';
var dbName = 'item';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
    console.log(req.session.user);
    console.log(req.locals);
});
//

module.exports = router;
