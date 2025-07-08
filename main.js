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
    
    // Thiết lập Express cho Replit
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
      if (!fs.existsSync(commandsPath)) {
        fs.mkdirSync(commandsPath, { recursive: true });
      }
      
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
      console.log(`Chi tiết lỗi: ${error.message}`, 'error');
    }
  }

  async loadEvents() {
    const loading = console.loading('Đang tải events...');
    
    try {
      const eventsPath = path.join(__dirname, 'includes');
      if (!fs.existsSync(eventsPath)) {
        fs.mkdirSync(eventsPath, { recursive: true });
      }
      
      const files = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
      
      for (const file of files) {
        try {
          const event = require(path.join(eventsPath, file));
          if (event.config && event.config.name) {
            this.events.set(event.config.name, event);
            console.log(`Đã tải event: ${event.config.name}`, 'debug');
          }
        } catch (error) {
          console.log(`Lỗi khi tải event ${file}: ${error.message}`, 'error');
        }
      }
      
      console.stopLoading(loading, `Đã tải ${this.events.size} events`);
    } catch (error) {
      console.stopLoading(loading, 'Lỗi khi tải events');
      console.log(`Chi tiết lỗi: ${error.message}`, 'error');
    }
  }

  async handleMessage(event) {
    if (event.type !== 'message' || !event.body) return;
    
    const { threadID, messageID, senderID, body } = event;
    
    // Kiểm tra prefix
    if (!body.startsWith(this.config.prefix)) return;
    
    const args = body.slice(this.config.prefix.length).trim().split(' ');
    const commandName = args.shift().toLowerCase();
    
    if (this.commands.has(commandName)) {
      const command = this.commands.get(commandName);
      
      try {
        console.log(`Thực hiện command: ${commandName} bởi ${senderID}`, 'info');
        await command.run({ api: this.api, event, args, config: this.config });
      } catch (error) {
        console.log(`Lỗi khi thực hiện command ${commandName}: ${error.message}`, 'error');
        this.api.sendMessage(`❌ Lỗi: ${error.message}`, threadID, messageID);
      }
    }
  }

  async handleEvent(event) {
    for (const [name, eventHandler] of this.events) {
      try {
        if (eventHandler.config && eventHandler.config.eventType.includes(event.type)) {
          await eventHandler.run({ api: this.api, event, config: this.config });
        }
      } catch (error) {
        console.log(`Lỗi trong event ${name}: ${error.message}`, 'error');
      }
    }
  }

  async login() {
    return new Promise((resolve, reject) => {
      const loading = console.loading('Đang đăng nhập...');
      
      try {
        const appStatePath = path.join(__dirname, 'appstate.json');
        
        if (!fs.existsSync(appStatePath)) {
          console.stopLoading(loading, 'Không tìm thấy appstate.json');
          console.log('Vui lòng thêm appstate.json để đăng nhập', 'warning');
          return reject(new Error('Không có appstate'));
        }
        
        const appState = fs.readJsonSync(appStatePath);
        
        if (!Array.isArray(appState) || appState.length === 0) {
          console.stopLoading(loading, 'Appstate trống hoặc không hợp lệ');
          console.log('Vui lòng cập nhật appstate.json với dữ liệu hợp lệ', 'warning');
          return reject(new Error('Appstate không hợp lệ'));
        }
        
        const loginOptions = {
          appState: appState,
          ...require('./FastConfigFca.json')
        };
        
        login(loginOptions, (err, api) => {
          if (err) {
            console.stopLoading(loading, 'Đăng nhập thất bại');
            console.log(`Chi tiết lỗi: ${err.error || err.message || err}`, 'error');
            return reject(err);
          }
          
          console.stopLoading(loading, 'Đăng nhập thành công!');
          
          this.api = api;
          
          // Lưu appstate mới
          fs.writeJsonSync(appStatePath, api.getAppState());
          
          // Thiết lập listeners
          api.setOptions(this.config);
          
          api.listenMqtt((err, event) => {
            if (err) {
              console.log(`Lỗi listen: ${err}`, 'error');
              return;
            }
            
            this.handleMessage(event);
            this.handleEvent(event);
          });
          
          resolve(api);
        });
        
      } catch (error) {
        console.stopLoading(loading, 'Lỗi đăng nhập');
        console.log(`Chi tiết: ${error.message}`, 'error');
        reject(error);
      }
    });
  }

  async start() {
    console.banner('MESSENGER BOT');
    
    console.log(console.center('🤖 Bot Messenger NodeJS với Console 7 màu 🌈'), 'info');
    console.log(console.center('Tạo bởi: Assistant AI'), 'info');
    console.divider();
    
    try {
      // Tải modules và events
      await Promise.all([
        this.loadCommands(),
        this.loadEvents()
      ]);
      
      // Đăng nhập
      await this.login();
      
      console.divider();
      console.log('🎉 Bot đã sẵn sàng hoạt động!', 'success');
      console.log(`📝 Prefix: ${this.config.prefix}`, 'info');
      console.log(`📊 Commands: ${this.commands.size}`, 'info');
      console.log(`🎭 Events: ${this.events.size}`, 'info');
      console.log(`⏰ Thời gian khởi động: ${moment().format('DD/MM/YYYY HH:mm:ss')}`, 'info');
      console.divider();
      
    } catch (error) {
      console.log(`❌ Lỗi khởi động bot: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

module.exports = MessengerBot;