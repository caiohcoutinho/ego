var express = require('express');
var app = express();
//var MongoClient = require('mongodb').MongoClient;
//var assert = require('assert');
var bodyParser = require('body-parser');

/*
var url = 'mongodb://localhost:27017/ego';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});
*/

app.use(express.static('src/main'));
app.use(express.static('lib'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.use("/api", router);

app.listen(3000, function () {
  console.log('Example app listening on port 3000');
});