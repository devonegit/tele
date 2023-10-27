// scene.js
const { Scenes } = require("telegraf");
const { mainKeyboardBuyer } = require("./keyboard");
//import user model
const Purchase_Order = require("../models/purchase");

// ************************************Purchase Item********************************

const purchaseScene = new Scenes.WizardScene(
  "purchaseScene",
  (ctx) => {
    // Step 1: Ask for the user's name

    ctx.reply("What Product SKU Code");
    ctx.wizard.state.sceneData = {};
    return ctx.wizard.next();
  },
  (ctx) => {
    // Step 2: Validate the user's name and ask for their email

    if (ctx.message.text === "🔙 Back") {
      ctx.reply("Back To Main Menu.", mainKeyboardBuyer);
      return ctx.scene.leave();
    } else if (ctx.message.text.length !== 3) {
      ctx.reply("Please enter a correct SKU Code.");
      return;
    } else {
      ctx.wizard.state.sceneData.SKU = ctx.message.text;
      ctx.reply("What is Your Required Quantity?");
      return ctx.wizard.next();
    }
  },
  async (ctx) => {
    // Step 3: Store the user's email and end the interaction
    if (ctx.message.text === "🔙 Back") {
      ctx.reply("Back To Main Menu.", mainKeyboardBuyer);
      return ctx.scene.leave();
    } else {
      ctx.wizard.state.sceneData.Quantity = await ctx.message.text;
      ctx.wizard.state.sceneData.Botid = await ctx.from.id;
      ctx.wizard.state.sceneData.Type = "Purchase";
      ctx.wizard.state.sceneData.Status = "Pending Confirmation";
      const response = await Purchase_Order.create(ctx.wizard.state.sceneData);
      console.log(response);
      ctx.reply(
        `\n✅✅✅✅✅✅✅✅✅✅✅\nThank you for your response!\nOrder Placed Successfully.\nOrder Number:\n#${response.id} 🛒`,
        mainKeyboardBuyer
      );
      return ctx.scene.leave();
    }
  }
);

//Track Item Scene

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed, so we add 1
  const year = date.getFullYear();

  // Ensure single digits have a leading zero
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}-${formattedMonth}-${year}`;
}

const trackScene = new Scenes.WizardScene("trackScene", async (ctx) => {
  // Assuming you have a botId and want to retrieve orders for that bot
  const botId = ctx.from.id; // Replace with your bot's ID

  if (ctx.message.text === "🔙 Back") {
    ctx.reply("Back To Main Menu.", mainKeyboardBuyer);
    return ctx.scene.leave();
  }

  try {
    const orders = await Purchase_Order.find({ Botid: botId }); // Retrieve orders based on botId
    if (orders.length === 0) {
      ctx.reply("No orders found! Kindly Place Orders.");
    } else {
      // Format and send the orders back to the user
      const orderText = orders.map((order, index) => {
        
        return `-----------------------------------------\n📦 Order Type: ${
          order.Type
        }\n🆔 Order ID: #${order.id}\n📦 Product: ${order.SKU}\n📊 Quantity: ${
          order.Quantity
        }\n📅 Date: ${formatDate(order.Date)}\n⏳ Status: ${order.Status}\n\n`;
      });
      ctx.reply(`Your Orders:\n\n\n${orderText}`);
    }
  } catch (error) {
    ctx.reply(
      "An error occurred while fetching orders. Please try again later."
    );
    console.error(error);
  }
});

module.exports = {
  purchaseScene,
  trackScene,
};
