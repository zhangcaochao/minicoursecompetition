var config=require("../config");

var WK = require("../mongo/model/wk")
var log=require("../log/log")


function* savewk(params){
    var wk = new WK(params);
    yield wk.save();
    return {code: 0};
}

function* getallwk(params){
    var all = {};
    if(params.sort)
        all = yield WK.find().sort({count:-1});
    else
        all = yield WK.find().sort({sn:1});

    return all;
}

function* searchwk(params){
    var wk = {};
    var op={};
    if(params.xx){
        op.$or = [{sn:params.xx},{teacherName:{$regex: '.*'+params.xx+'.*'}}, {wkName:{$regex: '.*'+params.xx+'.*'}}];
    }

    wk = yield WK.find(op);
    return wk;
}

function* countwk(params){
    yield WK.update({_id:params.id}, {$inc: {count:1}});
    return {code: 0};
}

function* getwk(params){
    var wk = yield WK.findOne({_id:params.id});
    if(wk){
        wk = wk.toObject();
        var query = WK.find({count: {$gt: wk.count}});
        wk.ranking = (yield query.count()) + 1;
        query = WK.find({count: wk.count, sn: {$lt: wk.sn}});
        wk.ranking = (yield query.count()) + wk.ranking;
        return wk;
    }
    return {};
}




module.exports=[
    ["/savewk", savewk],
    ["/getallwk", getallwk],
    ["/searchwk", searchwk],
    ["/countwk", countwk],
    ["/getwk", getwk]
]
