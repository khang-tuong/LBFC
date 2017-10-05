var botbuilder = require('botbuilder');
//Card
// module.exports.createHeroCard = function (session, title, subtitle, imageLink, buttonTitle) {
//     return new botbuilder.HeroCard(session)
//         .title(title)
//         .subtitle(subtitle)
//         .images([
//             botbuilder.CardImage.create(session, imageLink)
//         ])
//         .buttons([
//             botbuilder.CardAction.imBack(session, buttonTitle, buttonTitle)
//         ])
// }

// module.exports.createTwoOptionCard = function (session, option1, message1, option2, message2) {
//     return new botbuilder.HeroCard(session)
//         .buttons([
//             botbuilder.CardAction.imBack(session, option1, message1),
//             botbuilder.CardAction.imBack(session, option2, message2)
//         ])
// }
function createHeroCard(session, title, subtitle, imageLink, buttonTitle, message) {
    return new botbuilder.HeroCard(session)
        .title(title)
        .subtitle(subtitle)
        .images([
            botbuilder.CardImage.create(session, imageLink)
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, buttonTitle, message)
        ])
}

function createTwoOptionCard(session) {
    return new botbuilder.HeroCard(session)
        .buttons([
            botbuilder.CardAction.imBack(session, "Có", "Có"),
            botbuilder.CardAction.imBack(session, "Không", "Không")
        ])
}

module.exports = {
    createHeroCard: createHeroCard,
    createTwoOptionCard: createTwoOptionCard
}