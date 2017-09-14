var botbuilder = require('botbuilder');
var lib = new botbuilder.Library('products');
lib.dialog('getProduct', [
    function(session, args, next) {
        
        var intent = args.intent;
        
        var coffeeShopEntity = botbuilder.EntityRecognizer.findEntity(intent.entities, 'Coffee Shop');
        var restaurant = botbuilder.EntityRecognizer.findEntity(intent.entities, 'Restaurant');
        var clothesShop = botbuilder.EntityRecognizer.findEntity(intent.entities, 'Clothes Shop');
        var message = new botbuilder.Message(session);
        message.attachmentLayout(botbuilder.AttachmentLayout.carousel);
        if (coffeeShopEntity) {
            session.dialogData.searchType = 'Coffee Shop';
            session.send('Đợi mình xíu nhé');
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
                    .title('Lotteria')
                    .subtitle("Hambuger Gà")
                    .text("Giá: 36K")
                    .images([botbuilder.CardImage.create(session, 'http://www.lotteria.vn/resize.php?w=550&h=436&src=data/201538/ga-cay-c_8537.png')])
                    .buttons([
                        botbuilder.CardAction.imBack(session, "Order", "Order")
                    ])
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

module.exports.createLibrary = function() {
    return lib.clone();
};
