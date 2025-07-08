const moment = require('moment');
const os = require('os');

module.exports = {
  config: {
    name: "info",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Assistant AI",
    description: "Thông tin về bot",
    commandCategory: "Hệ thống",
    usages: "",
    cooldowns: 5,
    dependencies: {}
  },

  run: async function({ api, event }) {
    const { threadID, messageID } = event;
    
    try {
      const uptime = process.uptime();
      const uptimeString = moment.duration(uptime, 'seconds').humanize();
      
      const memoryUsage = process.memoryUsage();
      const memUsed = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2);
      const memTotal = (memoryUsage.heapTotal / 1024 / 1024).toFixed(2);
      
      let infoMessage = "🤖 THÔNG TIN BOT\n\n";
      infoMessage += `📛 Tên: Messenger Bot NodeJS\n`;
      infoMessage += `🏷️ Version: 1.0.0\n`;
      infoMessage += `⏰ Uptime: ${uptimeString}\n`;
      infoMessage += `💾 RAM: ${memUsed}MB/${memTotal}MB\n`;
      infoMessage += `🖥️ Platform: ${os.platform()}\n`;
      infoMessage += `⚡ Node.js: ${process.version}\n`;
      infoMessage += `🎨 Console: 7 màu cầu vồng\n`;
      infoMessage += `👨‍💻 Tạo bởi: Assistant AI\n\n`;
      infoMessage += `🌈 Bot với console đầy màu sắc!`;
      
      return api.sendMessage(infoMessage, threadID, messageID);
    } catch (error) {
      console.error('Lỗi trong lệnh info:', error);
      return api.sendMessage("❌ Có lỗi xảy ra!", threadID, messageID);
    }
  }
};