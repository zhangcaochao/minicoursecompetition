var express = require('express')
var config=require("./config");
var mongo=require("./mongo/connection");
var bodyParser=require("body-parser");
var app = express();
var init=require("./servlet/util")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
init(app,[
    [require("./servlet/wkds")]
])
app.listen(config.port,config.host);
