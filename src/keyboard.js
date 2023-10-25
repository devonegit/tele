
const mainKeyboard = {
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

  const backAndCancelKeyboard = {
    reply_markup: {
      keyboard: [["🔙 Back", "🚫 Cancel"]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };
  
  module.exports = {
    mainKeyboard,
    backAndCancelKeyboard
  };
  