const express = require('express')
require('dotenv').config()

const bot = require("./bot")

const app = express()

app.use(express.json())

async function main() {
    app.get("/", (req, res) => {
        res.status(200).json({
            message: "Server is live"
        })
    })

    app.post(`/${process.env.API_KEY}`, (req,res) => {
        bot.processUpdate(req.body)
        res.status(200).json({
            message: "Bot received message"
        })
    })
}

main()



app.listen(process.env.PORT || 8080, () => {
    console.log("Server started")
})

