var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');


// create a schema
var schema = new Schema({
    teacherName: String,
    schoolName: String,
    teacherDesc: String,
    wkName: String,
    wkLocation: String,
    sn: Number,
    count: {type: Number, default: 0},
});

schema.plugin(autoIncrement.plugin, {
    model: 'wk',
    field: 'sn',
    startAt: 1,
    incrementBy: 1
});
// the schema is useless so far
// we need to create a model using it
var m = mongoose.model('wk', schema, 'wk');

// make this available to our users in our Node applications
module.exports = m;
