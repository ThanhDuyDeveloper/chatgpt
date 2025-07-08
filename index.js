const MessengerBot = require('./main');

// Khởi tạo và chạy bot
const bot = new MessengerBot();

// Xử lý lỗi
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Bot đang tắt...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Bot đang tắt...');
  process.exit(0);
});

// Khởi động bot
bot.start().catch(error => {
  console.error('Lỗi khởi động bot:', error);
  process.exit(1);
});