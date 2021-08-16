var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
require('dotenv/config');
var mongoose = require('mongoose');
var Router = require('./routes/allRouters');
var app = express();
app.use(cors());

var mongoDb = '--# your mongodb acount #--'
mongoose.connect(mongoDb, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 


app.use('/LapinDesignerData', Router);
app.use('/', function(req, res){
  res.send("server run")
});
var server = app.listen(3080, function () {
  console.log("server run...")
})

module.exports = app;







