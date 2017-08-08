var topics = {};
var buffer={};
var hOP = topics.hasOwnProperty;
function subscribe(topic, listener,me) {
      // Create the topic's object if not yet created
    if(!hOP.call(topics, topic)) topics[topic] = [];

    // Add the listener to queue
    var one={l:listener,t:me};
    var index = topics[topic].push(one) -1;

    // Provide handle back for removal of topic
    var buf=buffer[topic];
    if(buf){
        listener.apply(me,buf);
        delete buffer[topic];
    }
    return function(){
        var one_topic=topics[topic];
        if(one_topic){
            var i=one_topic.indexOf(one);
            if(i>=0)
                one_topic.splice(i,1);
            if(one_topic.length == 0){
                delete topics[topic];
            }
        }       
    }
}
function publish(needBuffer,topic) {
    var begin=2;
    // If the topic doesn't exist, or there's no listeners in queue, just leave
    if(typeof (needBuffer) == "string"){
        topic=needBuffer;
		needBuffer=false;
        begin=1;
    }
    var args=Array.prototype.slice.call(arguments, begin);
    if(!hOP.call(topics, topic)){
		if(needBuffer){
			buffer[topic]=args;
		}
		return;
    }

    // Cycle through topics queue, fire!
    
    topics[topic].forEach(function(item) {
        item.l.apply(item.t,args);
    });
}
module.exports={
    subscribe: subscribe,
    publish:publish,
};