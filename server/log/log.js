const util = require('util');

var LEVEL={
	ERROR:1,
	WARN:2,
	INFO:3,
	DEBUG:4
}

var Log = {};
Log.globalLevel=LEVEL.DEBUG;

module.exports={
    debug: function(...args){
        if(LEVEL.DEBUG <= Log.globalLevel){
            console.log('[DEBUG]', new Date(), util.inspect(args, { showHidden: false, depth: null }));
        }
    },
    error: function(...args){
        if(LEVEL.ERROR <= Log.globalLevel){
            console.error('[ERROR]', new Date(), util.inspect(args, { showHidden: false, depth: null }));
        }
    },
    info: function(...args){
        if(LEVEL.INFO <= Log.globalLevel){
            console.info('[INFO]', new Date(), util.inspect(args, { showHidden: false, depth: null }));
        }
    },
    warn: function(...args){
        if(LEVEL.INFO <= Log.globalLevel){
            console.warn('[WARN]', new Date(), util.inspect(args, { showHidden: false, depth: null }));
        }
    }
};
