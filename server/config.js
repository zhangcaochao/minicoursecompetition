var defaultValue={
    mongodb:{
		url:"mongodb://devapp.plaso.cn:27018/wkds"
	},
    timeout: 60000,
    port:9008,
    host:"127.0.0.1"
}
var conf;
var value;

var fs=require("fs");
conf=process.env["CUSTOM_CONF"]||"/plaso/conf/wkds.js";
var state;
try{
    state=fs.statSync(conf);        
}catch(e){
    console.info(conf+" not exist use default instead")
    value=defaultValue;
}
if(state){
    var conf_value=require(conf)
    value=defaults(conf_value,defaultValue);
}
function defaults(t,s){
    for(var i in s){
        if(t[i]===undefined){
            t[i]=s[i];
        }else
        if(typeof s[i]=="object"){
            t[i]=defaults(t[i],s[i]);
        }
    }
    return t;
}
module.exports=value;
