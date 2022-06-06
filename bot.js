const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()

let bot;
const token = process.env.API_KEY

if (process.env.NODE_ENV === "HEROKU") {
    bot = new TelegramBot(token)
    bot.setWebHook(process.env.HEROKU_URL + token)
    console.log("Bot is live")
} else {
    bot = new TelegramBot(token, {polling: true})
}

console.log(`Bot is started in the ${process.env.NODE_ENV} mode`)


// BOT API

// bot.onText(/\/start/, (msg) => {
//     bot.sendMessage(
//         msg.chat.id,
//         `
//         Hello Stupiak!\nWhat do you want to eat for lunch today?\n
//         `,
//         {
//             "reply_markup": {
//                 "keyboard": [["1) Stuff'd"],["2) Encik Tan"],["3) McDonald"], ["4) KFC"], ["5) Others"]]
//             }
//         }
//     )
// })

bot.on('message', async (msg) => {
    console.log(msg.from.first_name, msg.text)
    try {

    if (msg.text == "/start") {
        bot.sendMessage(
            msg.chat.id,
            `
            Hello Stupiak!\nWhat do you want to eat for lunch today?\n
            `,
            {
                "reply_markup": {
                    "keyboard": [["1) Stuff'd"],["2) Encik Tan"],["3) McDonald"], ["4) KFC"], ["5) Others"]]
                }
            }
        )
    }


    else if (msg.text.slice(-6) == "Others") {
        bot.sendMessage(msg.chat.id, "Please type in what you want to eat. - Best Bro")
    } 

    else if (msg.text == "1) Stuff'd") {
        bot.sendMessage(msg.chat.id, "I will buy Kebab + Chicken for you. - Best Bro")
    }

    else if (msg.text == "2) Encik Tan") {
        bot.sendMessage(msg.chat.id, "We shall eat chicken cutlet today. - Best Bro")
    }

    else if (msg.text == "3) McDonald") {
        bot.sendMessage(msg.chat.id, "I can't believe you want to eat Salmon Burger again... - Best Bro")
    }

    else if (msg.text == "4) KFC" && msg.text !== "/start") {
        bot.sendMessage(msg.chat.id, "Hope the Yew Tee KFC today is not slow... - Best Bro")
    } 
    
    else {
        bot.sendMessage(msg.chat.id, "I will buy "  + msg.text +  " - Best Bro")
    }
    } catch {
        bot.sendMessage(msg.chat.id, "OI DON'T SPOIL MY BOT")
    }


})



module.exports = bot;






