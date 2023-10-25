// Import necessary modules and set up your Express app, environment variables, and the Telegram bot.
const dbconnect = require('./src/db');
dbconnect()


const express = require('express');
const expressApp = express();
expressApp.use(express.static('static'));
expressApp.use(express.json());

// Load environment variables from a .env file
require('dotenv').config();

// Import Axios for making HTTP requests and Telegraf for Telegram bot functionality
const axios = require('axios');
const { Telegraf, Markup, Scenes, session } = require('telegraf');
const bot = new Telegraf(process.env.TOKEN);

// Define the port for your Express app
const port = process.env.PORT || 3000;

//import scenes and keyboards
const {purchaseScene} = require('./src/scene')
const {mainKeyboard, backAndCancelKeyboard} = require('./src/keyboard')

// Create a stage and register the purchase scene
const stage = new Scenes.Stage([purchaseScene]);
bot.use(session());
bot.use(stage.middleware());


// Handle the /start command to initiate the bot
bot.command('start', ctx => {
  console.log(ctx.from);
  console.log(ctx.message.text);
  bot.telegram.sendMessage(ctx.chat.id, 'Hello there! Welcome to the Touchtek Bot', mainKeyboard);
});

// Handle the "🛒 Purchase Item" button click to start the purchase scene
bot.hears('🛒 Purchase Item', async (ctx) => {
  await ctx.reply('Hello! You Can Place Purchase Request For An Item Here. Kindly Provide Details Required Below', backAndCancelKeyboard)
  await ctx.scene.enter('purchaseScene');
});

// Launch the Telegram bot and start listening for messages
bot.launch();

// Start the Express app and listen on the defined port
expressApp.listen(port, () => console.log(`Listening on ${port}`));
