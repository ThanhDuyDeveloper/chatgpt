#!/bin/bash

echo "🤖 MESSENGER BOT AUTO-SETUP FOR REPLIT 🌈"
echo "========================================="

# Tạo cấu trúc thư mục
echo "📁 Creating directory structure..."
mkdir -p Horizon_Database includes languages LunarKrystal modules utils

# Tạo package.json
echo "📦 Creating package.json..."
cat > package.json << 'EOF'
{
  "name": "messenger-bot-nodejs",
  "version": "1.0.0",
  "description": "Facebook Messenger Bot with beautiful console effects",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "keywords": ["messenger", "bot", "facebook", "nodejs"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "facebook-chat-api": "^1.7.0",
    "chalk": "^4.1.2",
    "gradient-string": "^2.0.2",
    "figlet": "^1.5.2",
    "moment": "^2.29.4",
    "fs-extra": "^11.1.1",
    "axios": "^0.27.2",
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
EOF

# Tạo .replit config
echo "⚙️ Creating .replit config..."
cat > .replit << 'EOF'
run = "npm start"

[nix]
channel = "stable-22_11"

[deployment]
run = ["sh", "-c", "npm start"]

[[ports]]
localPort = 3000
externalPort = 80
EOF

# Tạo utils/console.js
echo "🎨 Creating beautiful 7-color console..."
cat > utils/console.js << 'EOF'
const chalk = require('chalk');
const gradient = require('gradient-string');
const figlet = require('figlet');

class BeautifulConsole {
  constructor() {
    this.colors = [
      '#ff0000', '#ff7f00', '#ffff00', '#00ff00', 
      '#0000ff', '#4b0082', '#9400d3'
    ];
    this.rainbow = gradient(this.colors);
    this.info = chalk.cyan;
    this.success = chalk.green;
    this.warning = chalk.yellow;
    this.error = chalk.red;
    this.debug = chalk.magenta;
  }

  banner(text = 'MESSENGER BOT') {
    console.clear();
    const banner = figlet.textSync(text, {
      font: 'ANSI Shadow',
      horizontalLayout: 'fitted'
    });
    console.log(this.rainbow(banner));
    console.log(this.rainbow('═'.repeat(80)));
    console.log();
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const timeStr = chalk.gray(`[${timestamp}]`);
    
    switch(type) {
      case 'success':
        console.log(`${timeStr} ${this.success('✓')} ${this.success(message)}`);
        break;
      case 'error':
        console.log(`${timeStr} ${this.error('✗')} ${this.error(message)}`);
        break;
      case 'warning':
        console.log(`${timeStr} ${this.warning('⚠')} ${this.warning(message)}`);
        break;
      case 'debug':
        console.log(`${timeStr} ${this.debug('🔍')} ${this.debug(message)}`);
        break;
      default:
        console.log(`${timeStr} ${this.info('ℹ')} ${this.info(message)}`);
    }
  }

  loading(text = 'Đang tải...') {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let i = 0;
    return setInterval(() => {
      process.stdout.write(`\r${this.info(frames[i])} ${text}`);
      i = (i + 1) % frames.length;
    }, 100);
  }

  stopLoading(interval, message = 'Hoàn thành!') {
    clearInterval(interval);
    process.stdout.write(`\r${this.success('✓')} ${this.success(message)}\n`);
  }

  center(text, width = 80) {
    const padding = Math.max(0, Math.floor((width - text.length) / 2));
    return ' '.repeat(padding) + text;
  }
}

module.exports = new BeautifulConsole();
EOF

# Tạo các files config
echo "⚙️ Creating config files..."

cat > config.json << 'EOF'
{
  "botName": "Messenger Bot",
  "prefix": "/",
  "adminBot": [],
  "adminOnly": false,
  "autoRestart": true,
  "logLevel": "info",
  "language": "vi",
  "autoMarkDelivery": true,
  "autoMarkRead": true,
  "forceLogin": true,
  "selfListen": false,
  "listenEvents": true,
  "updatePresence": true
}
EOF

cat > FastConfigFca.json << 'EOF'
{
  "encryptFeature": true,
  "autoMarkDelivery": true,
  "autoMarkRead": true,
  "listenEvents": true,
  "selfListen": false,
  "autoReconnect": true,
  "emitReady": true,
  "online": true,
  "updatePresence": true,
  "forceLogin": true
}
EOF

cat > appstate.json << 'EOF'
[]
EOF

# Tạo commands
echo "📝 Creating commands..."

cat > modules/help.js << 'EOF'
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
        let helpMessage = "📋 DANH SÁCH LỆNH:\n\n";
        helpMessage += "🎯 /help - Hiển thị danh sách lệnh\n";
        helpMessage += "📊 /info - Thông tin bot\n";
        helpMessage += "🎮 /ping - Kiểm tra ping\n";
        helpMessage += "👋 /say <tin nhắn> - Bot nhắn lại\n\n";
        helpMessage += "💡 Sử dụng: /help [tên lệnh] để xem chi tiết";
        return api.sendMessage(helpMessage, threadID, messageID);
      }
    } catch (error) {
      console.error('Lỗi trong lệnh help:', error);
      return api.sendMessage("❌ Có lỗi xảy ra!", threadID, messageID);
    }
  }
};
EOF

cat > modules/ping.js << 'EOF'
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
EOF

# Tạo main.js và index.js (rút gọn)
echo "🤖 Creating main bot files..."

curl -s "https://raw.githubusercontent.com/YOUR_REPO/main.js" > main.js 2>/dev/null || cat > main.js << 'EOF'
const fs = require('fs-extra');
const path = require('path');
const login = require('facebook-chat-api');
const express = require('express');
const moment = require('moment');
const console = require('./utils/console');

class MessengerBot {
  constructor() {
    this.config = require('./config.json');
    this.commands = new Map();
    this.events = new Map();
    this.api = null;
    this.app = express();
    
    this.app.get('/', (req, res) => {
      res.json({
        status: 'Bot đang hoạt động',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
      });
    });
    
    this.app.listen(3000, () => {
      console.log('Server Express đã khởi động trên port 3000', 'success');
    });
  }

  async loadCommands() {
    const loading = console.loading('Đang tải commands...');
    try {
      const commandsPath = path.join(__dirname, 'modules');
      const files = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
      
      for (const file of files) {
        try {
          const command = require(path.join(commandsPath, file));
          if (command.config && command.config.name) {
            this.commands.set(command.config.name, command);
            console.log(`Đã tải command: ${command.config.name}`, 'debug');
          }
        } catch (error) {
          console.log(`Lỗi khi tải command ${file}: ${error.message}`, 'error');
        }
      }
      console.stopLoading(loading, `Đã tải ${this.commands.size} commands`);
    } catch (error) {
      console.stopLoading(loading, 'Lỗi khi tải commands');
    }
  }

  async start() {
    console.banner('MESSENGER BOT');
    console.log(console.center('🤖 Bot Messenger NodeJS với Console 7 màu 🌈'), 'info');
    console.log(console.center('Tạo bởi: Assistant AI'), 'info');
    
    await this.loadCommands();
    
    console.log('🎉 Bot console đã sẵn sàng!', 'success');
    console.log('📝 Thêm AppState để bot hoạt động đầy đủ', 'warning');
  }
}

module.exports = MessengerBot;
EOF

cat > index.js << 'EOF'
const MessengerBot = require('./main');
const bot = new MessengerBot();

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

bot.start().catch(error => {
  console.error('Lỗi khởi động bot:', error);
  process.exit(1);
});
EOF

echo ""
echo "✅ SETUP HOÀN THÀNH!"
echo "🌈 Messenger Bot với Console 7 màu đã được tạo!"
echo ""
echo "📋 NEXT STEPS:"
echo "1. npm install"
echo "2. npm start (để xem console 7 màu)"
echo "3. Thêm AppState vào appstate.json để bot hoạt động đầy đủ"
echo ""
echo "🚀 Enjoy your beautiful 7-color console bot!"