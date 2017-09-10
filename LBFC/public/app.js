var port = process.env.PORT || 3000;
var botbuilder = require('botbuilder');

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

//morgan
app.use(morgan('dev'));

//body-parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.listen(port);

// Create chat connector for communicating with the Bot Framework Service
var connector = new botbuilder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// get user message
app.post('/public/message', connector.listen());

var bot = new botbuilder.UniversalBot(connector, function(session) {
    session.send("You said " + session.message.text);
});


console.log("Server start on port: " + port);