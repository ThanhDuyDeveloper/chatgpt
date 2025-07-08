module.exports = {
  config: {
    name: "antiUnsend",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Assistant AI",
    description: "Chống thu hồi tin nhắn",
    eventType: ["message_unsend"]
  },

  run: async function({ api, event }) {
    try {
      const { threadID, messageID, senderID } = event;
      
      // Lấy thông tin người gửi
      const userInfo = await api.getUserInfo(senderID);
      const userName = userInfo[senderID]?.name || "Người dùng";
      
      const antiUnsendMessage = `🚫 PHÁT HIỆN THU HỒI TIN NHẮN\n\n` +
        `👤 Người thu hồi: ${userName}\n` +
        `🆔 User ID: ${senderID}\n` +
        `📝 Message ID: ${messageID}\n` +
        `⏰ Thời gian: ${new Date().toLocaleString('vi-VN')}\n\n` +
        `💡 Tin nhắn đã bị thu hồi nhưng đã được ghi lại!`;
      
      api.sendMessage(antiUnsendMessage, threadID);
      
    } catch (error) {
      console.error('Lỗi trong event antiUnsend:', error);
    }
  }
};