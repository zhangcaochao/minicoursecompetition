var co=require("co")
var log=require("../log/log")
var express=require("express")
function jsonToString(result){
    if(typeof result !="object"){
        return result;
    }
    return JSON.stringify(result,function(k,v){
        if(v===null)return undefined;
        return v;
    })
}
function get(method){
    return function(request,response){
        co(function*(){
            var param=request.query;
            log.debug('get', request.originalUrl, param);
            var res=yield method(param,request,response);
            log.debug('result', res)
            var resString=jsonToString(res);
            if(resString==null){
                console.info("null return")
                return;
            }
            if(param.cb){
                response.send(param.cb+"("+resString+")");
            }else{
                response.send(resString);
            }
        }).catch(function(err){
            log.error(err)
            response.send("server error");
        })
    }
}

function post(method){
    return function(request,response){
        co(function*(){
            log.debug('post', request.originalUrl, request.body);
            var res=yield method(request.body,request,response);
            log.debug('result', res)
            response.send(jsonToString(res));
        }).catch(function(err){
            log.error(err)
            response.send("server error");
        })
    }
}
function getpost(path,func,postonly){
    if(!func){
        app.use(express.static(path));
    }
    if(typeof func=="string"){
        // func is dir
        app.use(path, express.static(func));
        return;
    }

    if(!postonly){
        app.get(path,get(func));
        app.post(path,post(func));
    }
    if(postonly!=undefined && typeof postonly=="object"){
        app.post(path,postonly,post(func));
    }else{
        app.post(path,post(func));
    }
    
}
var app;

module.exports=function(app1,configs){
    app=app1;
    for (var config of configs){
        var servlets=config[0];
        var pathPrefix=config[1]||"";
        for(var servlet of servlets){
            if(pathPrefix){
                servlet[0]=pathPrefix+servlet[0];
            }
            getpost(...servlet);
        }
    }
}
