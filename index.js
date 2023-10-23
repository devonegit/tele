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




bot.launch()

expressApp.use(bot.webhookCallback('/secret-path'))
bot.telegram.setWebhook('https://bot-b8n9.onrender.com/secret-path')


expressApp.listen(port, () => console.log(`Listening on ${port}`));
