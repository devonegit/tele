


//CRM Keyboard *****************************************************************
const mainKeyboardCRM = {
  reply_markup: {
    keyboard: [
      ["🛒 Orders"],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};
const mainKeyboard_OrderCRM = {
  reply_markup: {
    keyboard: [
      
      ["🛒 Unconfirmed", "Confirmed"],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};

const backAndCancelKeyboardCRM = {
  reply_markup: {
    keyboard: [["🔙 Back", "🚫 Cancel"]],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};

//Owner Keyboard *****************************************************************






//Buyer Keyboard *****************************************************************
const mainKeyboardBuyer = {
    reply_markup: {
      keyboard: [
        ["🛒 Purchase Item", "🔙 Return Item"],
        ["⚠️ Raise Complaint", "📦 Track Item"],
        ["🕒 History"],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };

  const backAndCancelKeyboardBuyer = {
    reply_markup: {
      keyboard: [["🔙 Back", "🚫 Cancel"]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };

  //Buyer Keyboard *****************************************************************
  
  module.exports = {
    mainKeyboardBuyer,
    backAndCancelKeyboardBuyer,
    mainKeyboardCRM,
    mainKeyboard_OrderCRM,
    backAndCancelKeyboardCRM
  };
  