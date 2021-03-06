const express = require("express")
const TelegramBot = require('node-telegram-bot-api')
let app = express()

require('dotenv').config()

const token = process.env.API_KEY

async function main() {

    const bot = new TelegramBot(token, {polling: true})

    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(msg.chat.id, "Jarrvee at yourrr serviceeee. What would you like to do, " + msg.from.first_name + " ?", {
            "reply_markup": {
                "keyboard": [
                    ["1) Get Homework List"],
                    ["KILL BOT"]
                ]
            }
        })
    })

    bot.on('message', async (msg) => {
        // console.log("Message send =>", msg)
        var Hi = "hi";
        if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
            bot.sendMessage(msg.chat.id,"Hello " + msg.from.first_name);
        }

        if (msg.text == "1) Get Homework List") {
            bot.sendMessage(msg.chat.id, "This is the list of your homework...")

        }

        // get chat id
        if (msg.text == "chatid") {
            bot.sendMessage(msg.chat.id, msg.chat.id)
        }

        // get chat number count
        if (msg.text == "count") {
            let count = await bot.getChatMemberCount(msg.chat.id)
            bot.sendMessage(msg.chat.id, count)
        }


        // send poll
        let question = "heelllo??"
        let options = ["1", "2", '3']

        if (msg.text == "poll") {
            let result = bot.sendPoll(msg.chat.id, question, options)
            console.log(result)
        }

        //send dice?
        if (msg.text =="dice") {
            bot.sendDice(msg.chat.id)
        }

    })

    


}


main()

app.listen(process.env.PORT || 8080, () => {
    console.log("Server has started");
});
