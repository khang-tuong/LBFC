var botbuilder = require('botbuilder');
var siteUrl = require('./site-url.js');

//create connector
var connector = new botbuilder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

//Initial Bot
var bot = new botbuilder.UniversalBot(connector, function (session) {
    session.send("Uni Space kính chào quý khách! Hôm này chúng tôi có: ");
    var message = new botbuilder.Message(session);
    session.sendTyping();
    message.attachmentLayout(botbuilder.AttachmentLayout.carousel);
    message.attachments([
        new botbuilder.HeroCard(session)
            .title("Mocha")
            .subtitle("Coffee, Chocolate, Vani, Đá")
            .images([botbuilder.CardImage.create(session, 'https://i.pinimg.com/736x/94/d4/49/94d449968b99699f959e096bb2c812e0--homemade-chocolate-pudding-pudding-recipes.jpg')])
            .buttons([
                botbuilder.CardAction.imBack(session, "Order", "Order")
            ]),
        new botbuilder.HeroCard(session)
            .title("Banana Cake")
            .subtitle("Bánh chuối siêu hạng")
            .images([botbuilder.CardImage.create(session, 'https://i.pinimg.com/736x/9b/8d/6b/9b8d6b453ad25b71fcf44a01a87f92e0--banana-upside-down-cake-upside-down-cakes.jpg')])
            .buttons([
                botbuilder.CardAction.imBack(session, "Order", "Order")
            ]),
        new botbuilder.HeroCard(session)
            .title("Matcha Ice Blended")
            .subtitle("Matcha, Cream, Ice")
            .images([botbuilder.CardImage.create(session, 'http://coffeenowhere.com/order/wp-content/uploads/2016/07/matcha-latte.png')])
            .buttons([
                botbuilder.CardAction.imBack(session, "Order", "Order")
            ])
    ]);
    setTimeout(function () {
        moreMessage = "Bạn có muốn xem thêm không";
        session.send(moreMessage);
    }, 5000);
    session.send(message)
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
