const colors = require('colors');
const figlet = require('figlet');

// Định nghĩa các màu sắc
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

// Function để hiện thị banner ASCII
function showBanner() {
  return new Promise((resolve) => {
    figlet('MESSENGER BOT', {
      font: 'ANSI Shadow',
      horizontalLayout: 'default',
      verticalLayout: 'default'
    }, (err, data) => {
      if (err) {
        console.log('Something went wrong...'.error);
        resolve();
        return;
      }
      
      console.clear();
      console.log('\n');
      console.log(data.rainbow);
      resolve();
    });
  });
}

// Function để hiển thị thông tin hệ thống
function showSystemInfo(port) {
  const separator = '═'.repeat(60);
  
  console.log('\n' + separator.cyan);
  console.log('🚀 THÔNG TIN HỆ THỐNG'.bold.green);
  console.log(separator.cyan);
  
  console.log('📱 Loại Bot:'.yellow + '          Messenger Bot'.white);
  console.log('⚡ Trạng thái:'.yellow + '        Đang hoạt động'.green.bold);
  console.log('🌐 Port:'.yellow + '             ' + port.toString().cyan.bold);
  console.log('📅 Thời gian khởi động:'.yellow + ' ' + new Date().toLocaleString('vi-VN').white);
  console.log('💻 Môi trường:'.yellow + '       ' + (process.env.NODE_ENV || 'development').blue);
  console.log('🔧 NodeJS:'.yellow + '          ' + process.version.green);
  
  console.log('\n' + separator.cyan);
  console.log('🔗 CÁC ĐƯỜNG DẪN QUAN TRỌNG'.bold.magenta);
  console.log(separator.cyan);
  
  console.log('🌍 Server:'.yellow + '          ' + `http://localhost:${port}`.underline.blue);
  console.log('🪝 Webhook:'.yellow + '         ' + `http://localhost:${port}/webhook`.underline.green);
  console.log('📚 Docs:'.yellow + '            ' + 'https://developers.facebook.com/docs/messenger-platform'.underline.cyan);
  
  console.log('\n' + separator.cyan);
  console.log('⚙️  CẤU HÌNH ENVIRONMENT'.bold.yellow);
  console.log(separator.cyan);
  
  const verifyToken = process.env.VERIFY_TOKEN;
  const pageToken = process.env.PAGE_ACCESS_TOKEN;
  
  console.log('🔑 VERIFY_TOKEN:'.yellow + '     ' + 
    (verifyToken && verifyToken !== 'your_verify_token_here' ? '✅ Đã cấu hình'.green : '❌ Chưa cấu hình'.red));
  
  console.log('🎫 PAGE_ACCESS_TOKEN:'.yellow + ' ' + 
    (pageToken && pageToken !== 'your_page_access_token_here' ? '✅ Đã cấu hình'.green : '❌ Chưa cấu hình'.red));
  
  console.log('\n' + separator.cyan);
  console.log('📝 COMMANDS AVAILABLE'.bold.blue);
  console.log(separator.cyan);
  
  const commands = [
    { cmd: 'hello, xin chào', desc: 'Chào hỏi với bot' },
    { cmd: 'help, giúp đỡ', desc: 'Hiển thị hướng dẫn' },
    { cmd: 'menu', desc: 'Hiển thị menu tương tác' },
    { cmd: 'thời gian, time', desc: 'Xem thời gian hiện tại' }
  ];
  
  commands.forEach(item => {
    console.log(`💬 ${item.cmd.padEnd(20).cyan} - ${item.desc.white}`);
  });
  
  console.log('\n' + separator.rainbow);
  console.log('🎉 BOT MESSENGER ĐÃ SẴN SÀNG HOẠT ĐỘNG! 🎉'.bold.green);
  console.log(separator.rainbow);
  console.log('\n');
}

// Function để hiển thị loading animation
function showLoading(text = 'Đang khởi động bot') {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let i = 0;
  
  return setInterval(() => {
    process.stdout.write(`\r${frames[i]} ${text}...`.cyan);
    i = (i + 1) % frames.length;
  }, 100);
}

// Function để dừng loading
function stopLoading(interval) {
  clearInterval(interval);
  process.stdout.write('\r✅ Bot đã khởi động thành công!\n'.green);
}

// Function để hiển thị message log đẹp
function logMessage(type, message) {
  const timestamp = new Date().toLocaleTimeString('vi-VN');
  const prefix = `[${timestamp}]`;
  
  switch(type) {
    case 'info':
      console.log(`${prefix.grey} ${'INFO'.blue.bold}  ${message.white}`);
      break;
    case 'success':
      console.log(`${prefix.grey} ${'✅ SUCCESS'.green.bold} ${message.white}`);
      break;
    case 'warning':
      console.log(`${prefix.grey} ${'⚠️  WARNING'.yellow.bold} ${message.white}`);
      break;
    case 'error':
      console.log(`${prefix.grey} ${'❌ ERROR'.red.bold} ${message.white}`);
      break;
    case 'webhook':
      console.log(`${prefix.grey} ${'🪝 WEBHOOK'.magenta.bold} ${message.white}`);
      break;
    case 'message':
      console.log(`${prefix.grey} ${'💬 MESSAGE'.cyan.bold} ${message.white}`);
      break;
    default:
      console.log(`${prefix.grey} ${message.white}`);
  }
}

// Function để hiển thị startup hoàn chỉnh
async function startupConsole(port) {
  // Hiển thị loading
  const loadingInterval = showLoading('Khởi động Messenger Bot');
  
  // Đợi 2 giây để tạo hiệu ứng
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Dừng loading
  stopLoading(loadingInterval);
  
  // Hiển thị banner
  await showBanner();
  
  // Hiển thị thông tin hệ thống
  showSystemInfo(port);
}

module.exports = {
  startupConsole,
  logMessage,
  showBanner,
  showSystemInfo,
  showLoading,
  stopLoading
};