var botbuilder = require('botbuilder');
var siteUrl = require('./site-url.js');
    
    //create connector
var connector = new botbuilder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new botbuilder.UniversalBot(connector, function(session) {
    session.send("You said " + session.message.text);
});
//luis
var luisAppUrl = process.env.LUIS_APP_URL || 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/f27af6e6-01da-4685-ac7a-1e5e7cd744d8?subscription-key=747a9082c49148218afb177584a54ec4&timezoneOffset=0&verbose=true&q=';

bot.recognizer(new botbuilder.LuisRecognizer(luisAppUrl));

// Connector listener wrapper to capture site url
var connectorListener = connector.listen();
function listen() {
    return function (req, res) {
        // Capture the url for the hosted application
        // We'll later needs this url to create the checkout link 
        var url = req.protocol + '://' + req.get('host');
        siteUrl.save(url);
        connectorListener(req, res);
    };
};


//Dialogs
bot.library(require('./dialogs/products').createLibrary());

// Other wrapper functions
function beginDialog(address, dialogId, dialogArgs) {
    bot.beginDialog(address, dialogId, dialogArgs);
};

function sendMessage(message) {
    bot.send(message);
};

module.exports = {
    listen: listen,
    beginDialog: beginDialog,
    sendMessage: sendMessage
};

