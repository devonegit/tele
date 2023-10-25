// scene.js
const { Scenes } = require("telegraf");
const { mainKeyboard } = require("./keyboard");
//import user model
const User = require("../models/purchase");

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
      ctx.reply("Back To Main Menu.", mainKeyboard);
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
      ctx.reply("Back To Main Menu.", mainKeyboard);
      return ctx.scene.leave();
    } else {
      ctx.wizard.state.sceneData.Quantity = await ctx.message.text;
      const response = await User.create(ctx.wizard.state.sceneData)
      console.log(response);
      ctx.reply(
        `✅ Thank you for your response!
     Your Order has been Placed Successfully.
     Order Number: #${response.id} 🛒`,
        mainKeyboard
      );
      return ctx.scene.leave();
    }
  }
);

module.exports = {
  purchaseScene,
};
