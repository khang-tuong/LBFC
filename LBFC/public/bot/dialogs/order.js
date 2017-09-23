var botbuilder = require('botbuilder');
var lib = new botbuilder.Library('order');

lib.dialog('orderProduct',[
    function(session, args, next) {
        var intent = args.intent;
    }
])