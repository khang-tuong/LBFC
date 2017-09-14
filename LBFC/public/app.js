var port = process.env.PORT || 3000;
var luisAppUrl = process.env.LUIS_APP_URL || 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/f27af6e6-01da-4685-ac7a-1e5e7cd744d8?subscription-key=747a9082c49148218afb177584a54ec4&timezoneOffset=0&verbose=true&q=';
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

bot.recognizer(new botbuilder.LuisRecognizer(luisAppUrl));

bot.dialog('getProduct', [
    function(session, args, next) {
        
        var intent = args.intent;
        
        var coffeeShopEntity = botbuilder.EntityRecognizer.findEntity(intent.entities, 'Coffee Shop');
        var restaurant = botbuilder.EntityRecognizer.findEntity(intent.entities, 'Restaurant');
        var clothesShop = botbuilder.EntityRecognizer.findEntity(intent.entities, 'Clothes Shop');
        var message = new botbuilder.Message(session);
        message.attachmentLayout(botbuilder.AttachmentLayout.carousel);
        if (coffeeShopEntity) {
            session.dialogData.searchType = 'Coffee Shop';
            message.attachments([
                new botbuilder.HeroCard(session)
                    .title('Ba cô gái')
                    .subtitle("Bò bít tết sốt rượu vang")
                    .text("Size nhỏ: 45k, size lớn: 60k")
                    .images([botbuilder.CardImage.create(session, 'http://vinbeefood.com/timthumb.php?src=upload/images/bo-bit-tet-va-bo-ne.png')])
                    .buttons([
                        botbuilder.CardAction.imBack(session, "Order", "Order")
                    ]),
                new botbuilder.HeroCard(session)
                    .title('Gong Cha')
                    .subtitle("Trà sữa Gong Cha")
                    .text("Size nhỏ: 43k, size lớn: 55k")
                    .images([botbuilder.CardImage.create(session, 'http://www.gongchausa.com/wp-content/uploads/2017/01/Coffee-Milk-Tea-722x1024.png')])
                    .buttons([
                        botbuilder.CardAction.imBack(session, "Order", "Order")
                    ]),
            ]);
        } else if (restaurant) {
            session.dialogData.searchType = 'Restaurant';
            message += 'món ăn của ' + restaurant.resolution.values;
        } else if (clothesShop) {
            session.dialogData.searchType = 'Clothes Shop';
            message += 'sản phẩm của ' + clothesShop.resolution.values;
        } else {
            message = "Xin lỗi, cửa hàng này không nằm trong chuỗi hệ thống của chúng tôi!";
        }
        session.send(message);
    }
]).triggerAction({
    matches: ['GetCoffeeShopProduct', 'GetRestaurantProduct', 'GetClothesShopProduct'],
    confirmPrompt: 'Minh cho bạn xem menu của %s nhé?' 
});

console.log("Server start on port: " + port);
