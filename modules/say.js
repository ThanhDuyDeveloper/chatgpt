module.exports = {
  config: {
    name: "say",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Assistant AI",
    description: "Bot sẽ nhắn lại tin nhắn của bạn",
    commandCategory: "Giải trí",
    usages: "<tin nhắn>",
    cooldowns: 2,
    dependencies: {}
  },

  run: async function({ api, event, args }) {
    const { threadID, messageID } = event;
    
    try {
      if (args.length === 0) {
        return api.sendMessage("❌ Vui lòng nhập tin nhắn cần bot nhắn lại!\n💡 Ví dụ: /say Xin chào mọi người!", threadID, messageID);
      }
      
      const message = args.join(" ");
      
      if (message.length > 500) {
        return api.sendMessage("❌ Tin nhắn quá dài! Vui lòng nhập ít hơn 500 ký tự.", threadID, messageID);
      }
      
      return api.sendMessage(`🗣️ ${message}`, threadID);
    } catch (error) {
      console.error('Lỗi trong lệnh say:', error);
      return api.sendMessage("❌ Có lỗi xảy ra!", threadID, messageID);
    }
  }
};