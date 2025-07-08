module.exports = {
  config: {
    name: "ping",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Assistant AI",
    description: "Kiểm tra ping của bot",
    commandCategory: "Tiện ích",
    usages: "",
    cooldowns: 3,
    dependencies: {}
  },

  run: async function({ api, event }) {
    const { threadID, messageID } = event;
    
    try {
      const startTime = Date.now();
      
      return api.sendMessage("🏓 Pong!", threadID, (err, info) => {
        if (err) return;
        
        const endTime = Date.now();
        const ping = endTime - startTime;
        
        const pingMessage = `🏓 Pong!\n⚡ Thời gian phản hồi: ${ping}ms\n🎯 Status: ${ping < 100 ? 'Tuyệt vời' : ping < 300 ? 'Tốt' : 'Chậm'}`;
        
        api.editMessage(pingMessage, info.messageID);
      });
    } catch (error) {
      console.error('Lỗi trong lệnh ping:', error);
      return api.sendMessage("❌ Có lỗi xảy ra!", threadID, messageID);
    }
  }
};