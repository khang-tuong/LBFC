var botbuilder = require('botbuilder');
var lib = new botbuilder.Library('show-more');
var config = require('../bot-config');
var bot = new botbuilder.Dialog

var listProduct = [
    {
        'name': 'Cupcakes',
        'description': 'Bánh bông lan kem siêu hạng',
        'link': 'https://i.pinimg.com/736x/db/a2/72/dba272aae31b84d0d0091a3d2960b181--liquor-cupcakes-rum-cupcakes.jpg',
    },
    {
        'name': 'Bánh bông lan kem Caramel',
        'description': 'Caramel, Chocolate, Muối',
        'link': 'https://716f24d81edeb11608aa-99aa5ccfecf745e7cf976b37d172ce54.ssl.cf1.rackcdn.com/samantha-bees-salty-caramel-bake-1265288l2.jpg',
    }
]

lib.dialog('showMoreProduct', [
    function (session, next) {
        var message = new botbuilder.Message(session);
        //var intent = args.intent;
        //var confirmEntity = botbuilder.EntityRecognizer.findEntity(intent.entities, 'ConfirmVerb');
        message.attachmentLayout(botbuilder.AttachmentLayout.carousel);
        // if (intent.intent == 'Confirm') {
        //     if (confirmEntity.resolution.values == 'Yes') {
        message.attachments([
            config.createHeroCard(session, listProduct[0].name, listProduct[0].description,
                listProduct[0].link, 'Đặt hàng'),
            config.createHeroCard(session, listProduct[1].name, listProduct[1].description,
                listProduct[1].link, 'Đặt hàng')
        ]);
        session.dialogData.confirm = 'Yes';
        //     } else {
        //         message = 'Cảm ơn bạn đã đến với cửa hàng của chúng tôi';
        //         session.dialogData.confirm = 'Yes';
        //     }
        // }
        session.send(message);
    }
])

module.exports.createLibrary = function () {
    return lib.clone();
}