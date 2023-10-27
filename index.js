// Import necessary modules and set up your Express app, environment variables, and the Telegram bot.
const dbconnect = require("./src/db");
dbconnect();

const express = require("express");
const expressApp = express();
expressApp.use(express.static("static"));
expressApp.use(express.json());

//access role
const getUserRole = require("./src/role");

// Load environment variables from a .env file
require("dotenv").config();

// Import Axios for making HTTP requests and Telegraf for Telegram bot functionality
const axios = require("axios");
const { Telegraf, Markup, Scenes, session } = require("telegraf");
const bot = new Telegraf(process.env.TOKEN);

// Define the port for your Express app
const port = process.env.PORT || 3000;

//import scenes and keyboards
const { purchaseScene, trackScene } = require("./src/scene");
const { mainKeyboardBuyer, mainKeyboardCRM, backAndCancelKeyboardBuyer } = require("./src/keyboard");

// Create a stage and register the purchase scene
const stage = new Scenes.Stage([purchaseScene, trackScene]);
bot.use(session());
bot.use(stage.middleware());

// Handle the /start command to initiate the bot
bot.command("start", async (ctx) => {
  const role = await getUserRole(ctx.from.id);
  console.log(role);
  if (role === "Owner") {
    bot.telegram.sendMessage(
      ctx.chat.id,
      "Welcome to the touchtek bot (Admin) ",
      mainKeyboardCRM
    );
  }
  if (role === "Buyer") {
    bot.telegram.sendMessage(
      ctx.chat.id,
      "Welcome to the Touchtek Bot (Buyer) ",
      mainKeyboardBuyer
    );
  }
  if (role === "Not Found") {
    bot.telegram.sendMessage(
      ctx.chat.id,
      "Unathorized Access! You Not Able to Access",
      
    );
  }
});

// Handle the "🛒 Purchase Item" button click to start the purchase scene
bot.hears("🛒 Purchase Item", async (ctx) => {
  await ctx.reply(
    "Hello! You Can Place Purchase Request For An Item Here. Kindly Provide Details Required Below",
    backAndCancelKeyboardBuyer
  );
  await ctx.scene.enter("purchaseScene");
});
bot.hears("📦 Track Item", async (ctx) => {
  await ctx.reply(
    "You Can Track All Your Purchase and Return Order Here",
    backAndCancelKeyboardBuyer
  );
  await ctx.scene.enter("trackScene");
});
// Launch the Telegram bot and start listening for messages
bot.launch();

// Start the Express app and listen on the defined port
expressApp.listen(port, () => console.log(`Listening on ${port}`));
