const express = require("express")
const TelegramBot = require('node-telegram-bot-api')
let app = express()

require('dotenv').config()

const token = process.env.API_KEY
const port = process.env.PORT || 8080

app.use(express.json())



async function main() {

    const bot = new TelegramBot(token)

    app.get("/", (req,res) => {
        res.status(200).json({
            "message": "Hello! The bot is working!"
        })
    })
    
    app.post(`/${process.env.API_KEY}`, (req,res) => {
        console.log("webhook called")
        bot.setWebHook(process.env.HEROKU_URL + token)
        bot.processUpdate(req.body)
    })


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

}


main()


app.listen(port, () => {
    console.log("Server started")
})



