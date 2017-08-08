var mongoose = require('mongoose');
var conf = require("../config");
var logger = require('../log/log');
var autoIncrement = require('mongoose-auto-increment');

mongoose.connect(conf.mongodb.url);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
autoIncrement.initialize(db);
db.on('error', function(error) {logger.error( "connect to "+conf.mongodb.url+" failed");});
db.once('open', function() {
    logger.debug("mongo connected!");
});

module.exports = db;
