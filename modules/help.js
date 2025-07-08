module.exports = {
  config: {
    name: "help",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Assistant AI",
    description: "Hiển thị danh sách lệnh",
    commandCategory: "Hệ thống",
    usages: "[tên lệnh]",
    cooldowns: 5,
    dependencies: {}
  },

  run: async function({ api, event, args }) {
    const { threadID, messageID } = event;
    
    try {
      if (args.length === 0) {
        // Hiển thị tất cả lệnh
        let helpMessage = "📋 DANH SÁCH LỆNH:\n\n";
        helpMessage += "🎯 /help - Hiển thị danh sách lệnh\n";
        helpMessage += "📊 /info - Thông tin bot\n";
        helpMessage += "🎮 /ping - Kiểm tra ping\n";
        helpMessage += "👋 /say <tin nhắn> - Bot nhắn lại\n\n";
        helpMessage += "💡 Sử dụng: /help [tên lệnh] để xem chi tiết";
        
        return api.sendMessage(helpMessage, threadID, messageID);
      } else {
        // Hiển thị thông tin lệnh cụ thể
        const commandName = args[0].toLowerCase();
        const commands = {
          "help": "📋 Lệnh help - Hiển thị danh sách lệnh\n⚙️ Cách dùng: /help [tên lệnh]",
          "info": "📊 Lệnh info - Hiển thị thông tin bot\n⚙️ Cách dùng: /info",
          "ping": "🎮 Lệnh ping - Kiểm tra thời gian phản hồi\n⚙️ Cách dùng: /ping", 
          "say": "👋 Lệnh say - Bot sẽ nhắn lại tin nhắn của bạn\n⚙️ Cách dùng: /say <tin nhắn>"
        };
        
        if (commands[commandName]) {
          return api.sendMessage(commands[commandName], threadID, messageID);
        } else {
          return api.sendMessage(`❌ Không tìm thấy lệnh "${commandName}"`, threadID, messageID);
        }
      }
    } catch (error) {
      console.error('Lỗi trong lệnh help:', error);
      return api.sendMessage("❌ Có lỗi xảy ra!", threadID, messageID);
    }
  }
};