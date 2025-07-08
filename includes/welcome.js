module.exports = {
  config: {
    name: "welcome",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Assistant AI",
    description: "Chào mừng thành viên mới",
    eventType: ["log:subscribe"]
  },

  run: async function({ api, event }) {
    try {
      if (event.logMessageData.addedParticipants) {
        const { threadID } = event;
        const addedParticipants = event.logMessageData.addedParticipants;
        
        for (const participant of addedParticipants) {
          if (participant.userFbId === api.getCurrentUserID()) {
            // Bot được thêm vào nhóm
            const welcomeBotMessage = `🤖 Xin chào! Tôi là Bot Messenger NodeJS\n\n` +
              `🌈 Tôi có console 7 màu cầu vồng tuyệt đẹp!\n` +
              `📝 Prefix: /\n` +
              `🎯 Gõ /help để xem danh sách lệnh\n\n` +
              `✨ Cảm ơn bạn đã thêm tôi vào nhóm!`;
            
            api.sendMessage(welcomeBotMessage, threadID);
          } else {
            // Thành viên mới được thêm vào
            const userName = participant.fullName || "Thành viên mới";
            const welcomeMessage = `🎉 Chào mừng ${userName} đã tham gia nhóm!\n\n` +
              `💫 Chúc bạn có những trải nghiệm tuyệt vời tại đây!\n` +
              `🤖 Gõ /help để xem các lệnh bot có thể sử dụng.`;
            
            api.sendMessage(welcomeMessage, threadID);
          }
        }
      }
    } catch (error) {
      console.error('Lỗi trong event welcome:', error);
    }
  }
};