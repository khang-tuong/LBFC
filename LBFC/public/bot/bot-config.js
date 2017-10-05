var botbuilder = require('botbuilder');
var siteUrl = require('./site-url.js');
var request = require('./tools/request');
var card = require('./tools/card');
var converter = require('./vietnamese/vietnamese-converter');

//create connector
var connector = new botbuilder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// var convert = new converter.VietNameseConverter();
// convert.readFile(function(){
//     console.log(convert.convert("toi muon an do an do an trung quoc"));
// });


var listProduct = [
    {
        "ProductName": "Mocha",
        "Description": "Coffee, Chocolate, Vani, Đá",
        "PicURL": "https://i.pinimg.com/736x/94/d4/49/94d449968b99699f959e096bb2c812e0--homemade-chocolate-pudding-pudding-recipes.jpg",
    },
    {
        "ProductName": "Banana Cake",
        "Description": "Bánh chuối siêu hạng",
        "PicURL" : "https://i.pinimg.com/736x/9b/8d/6b/9b8d6b453ad25b71fcf44a01a87f92e0--banana-upside-down-cake-upside-down-cakes.jpg",
    },
    {
        "ProductName": "Matcha Ice Blended",
        "Description": "Matcha, Cream, Ice",
        "PicURL": "http://coffeenowhere.com/order/wp-content/uploads/2016/07/matcha-latte.png",
    }
]

//Initial Bot

var bot = new botbuilder.UniversalBot(connector, [
    function (session) {
        session.send("Highland Coffee kính chào quý khách! Hôm này chúng tôi có: ");
        var message = new botbuilder.Message(session);
        message.attachmentLayout(botbuilder.AttachmentLayout.carousel);

        //Create first conversation
        request.sendRequest("/1/Products/0/Products/GetTopProduct", "", function(listProductStr){
            //Create hero cards
            var cards = [];
            // var listProduct = JSON.parse(listProductStr);
            for (var i = 0; i < listProduct.length; ++i) {
                cards.push(card.createHeroCard(session, listProduct[i].ProductName, listProduct[i].Description,
                    listProduct[i].PicURL, 'Đặt ' + listProduct[i].ProductName, 'Đặt hàng'));
            }
            message.attachments(cards);
            //console.log(message.data.attachments);
            // session.send(message);
            var optionCard = card.createTwoOptionCard(session);
            session.sendTyping()
            setTimeout(function () {
                message = "Bạn có muốn xem thêm không?";
                session.send(message);
                session.send(new botbuilder.Message(session).addAttachment(optionCard));
            }, 3000);
           session.send(message);
        })
        
        
    }
]);



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


// Send welcome when conversation with bot is started, by initiating the root dialog
bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                bot.beginDialog(message.address, '/');
            }
        });
    }
});

// Dialogs
bot.library(require('./dialogs/products').createLibrary());
bot.library(require('./dialogs/show-more').createLibrary());
bot.library(require('./dialogs/order').createLibrary());

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
    sendMessage: sendMessage,
};
