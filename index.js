const express = require('express')
const expressApp = express()
const axios = require("axios");
const path = require("path")
const port = process.env.PORT || 3000;
expressApp.use(express.static('static'))
expressApp.use(express.json());
require('dotenv').config();

const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TOKEN);
const mainKeyboard = {
  reply_markup: {
    keyboard: [
      ["Inventory System", "Collection System"],
      ["Attendance System", "Employee Score"],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};

  


  bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Hello there! Welcome to the Code Capsules telegram bot.\nI respond to /ethereum. Please try it', mainKeyboard)
  })
  
  bot.command('ethereum', ctx => {
    var rate;
    console.log(ctx.from)
    axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
    .then(response => {
      console.log(response.data)
      rate = response.data.ethereum
      const message = `Hello, today the ethereum price is ${rate.usd}USD`
      bot.telegram.sendMessage(ctx.chat.id, message, {
      })
    })
  })




bot.launch({
  webhook: {
    // Public domain for webhook; e.g.: example.com
    domain: 'https://bot-b8n9.onrender.com/',

    // Port to listen on; e.g.: 8080
    port: port,

    // Optional secret to be sent back in a header for security.
    // e.g.: `crypto.randomBytes(64).toString("hex")`
    secretToken: 408727,
  },
});

// bot.launch()

// expressApp.use(bot.webhookCallback('/'))
// bot.telegram.setWebhook('https://api.render.com/deploy/srv-ckr3e6e2eoec73cscf40?key=9kA0ItqGeJc')


expressApp.listen(port, () => console.log(`Listening on ${port}`));
