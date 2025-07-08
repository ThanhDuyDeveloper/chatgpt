# 🤖 Messenger Bot NodeJS với Console 7 màu 🌈

Bot Messenger tuyệt đẹp được viết bằng NodeJS, tương thích với Replit và có console đầy màu sắc!

## ✨ Tính năng

- 🌈 Console 7 màu cầu vồng tuyệt đẹp
- 🤖 Bot Messenger tự động
- 📝 Hệ thống lệnh linh hoạt  
- 🎭 Hệ thống sự kiện đầy đủ
- 🔄 Tự động khởi động lại
- 📊 Theo dõi trạng thái real-time
- 🛡️ Xử lý lỗi thông minh
- ☁️ Tương thích với Replit

## 📁 Cấu trúc Project

```
📦 messenger-bot-nodejs
├── 📁 Horizon_Database/     # Database files
├── 📁 includes/             # Event handlers
│   ├── welcome.js          # Chào mừng thành viên mới
│   └── antiUnsend.js       # Chống thu hồi tin nhắn
├── 📁 languages/           # Ngôn ngữ
├── 📁 LunarKrystal/        # Các tính năng đặc biệt
├── 📁 modules/             # Commands
│   ├── help.js            # Lệnh help
│   ├── info.js            # Thông tin bot
│   ├── ping.js            # Kiểm tra ping
│   └── say.js             # Bot nhắn lại
├── 📁 utils/               # Tiện ích
│   └── console.js         # Console 7 màu
├── 📄 appstate.json       # Trạng thái đăng nhập Facebook
├── 📄 config.json         # Cấu hình bot
├── 📄 FastConfigFca.json  # Cấu hình FCA
├── 📄 index.js            # Entry point
├── 📄 main.js             # Logic chính
├── 📄 package.json        # Dependencies
└── 📄 README.md           # Hướng dẫn này
```

## 🚀 Cài đặt

### 1. Clone hoặc tải về project

```bash
git clone <repository-url>
cd messenger-bot-nodejs
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Lấy AppState Facebook

**Cách 1: Sử dụng Extension Facebook**
1. Cài đặt extension "F5 - Automation Tool" cho Chrome
2. Đăng nhập Facebook 
3. Mở extension và copy AppState
4. Dán vào file `appstate.json`

**Cách 2: Sử dụng Developer Tools**
1. Đăng nhập Facebook
2. Mở Developer Tools (F12)
3. Vào tab Application/Storage → Cookies → https://facebook.com
4. Copy tất cả cookies và convert sang format AppState
5. Dán vào file `appstate.json`

### 4. Cấu hình Bot

Chỉnh sửa file `config.json`:

```json
{
  "botName": "Tên Bot của bạn",
  "prefix": "/",
  "adminBot": ["your-facebook-id"],
  "language": "vi"
}
```

### 5. Chạy Bot

```bash
npm start
```

## 🎨 Console 7 màu

Bot sử dụng console với 7 màu cầu vồng:
- 🔴 Đỏ - Lỗi  
- 🟠 Cam - Cảnh báo
- 🟡 Vàng - Cảnh báo nhẹ
- 🟢 Xanh lá - Thành công
- 🔵 Xanh dương - Thông tin
- 🟣 Tím - Debug
- 🟤 Nâu - Hệ thống

## 📝 Sử dụng

### Lệnh cơ bản:

- `/help` - Xem danh sách lệnh
- `/info` - Thông tin bot
- `/ping` - Kiểm tra ping
- `/say <tin nhắn>` - Bot nhắn lại

### Tạo lệnh mới:

1. Tạo file `.js` trong thư mục `modules/`
2. Sử dụng template:

```javascript
module.exports = {
  config: {
    name: "tên-lệnh",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Tên tác giả",
    description: "Mô tả lệnh",
    commandCategory: "Danh mục",
    usages: "Cách sử dụng",
    cooldowns: 5,
    dependencies: {}
  },

  run: async function({ api, event, args, config }) {
    // Logic lệnh tại đây
  }
};
```

### Tạo event mới:

1. Tạo file `.js` trong thư mục `includes/`
2. Sử dụng template:

```javascript
module.exports = {
  config: {
    name: "tên-event",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Tên tác giả", 
    description: "Mô tả event",
    eventType: ["message", "log:subscribe", "message_unsend"]
  },

  run: async function({ api, event, config }) {
    // Logic event tại đây
  }
};
```

## 🔧 Cấu hình nâng cao

### Config.json

```json
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
```

### FastConfigFca.json

```json
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
```

## 🌐 Deploy trên Replit

1. Tạo Repl mới với template Node.js
2. Upload tất cả files
3. Cấu hình `appstate.json`
4. Chạy bot với `npm start`
5. Bot sẽ tự động khởi động server Express trên port 3000

## 🆘 Khắc phục sự cố

### Bot không đăng nhập được
- Kiểm tra `appstate.json` có đúng format
- Đảm bảo Facebook account không bị khóa
- Thử đăng nhập lại và lấy AppState mới

### Lỗi "Cannot find module"
- Chạy `npm install` để cài đặt dependencies
- Kiểm tra file `package.json`

### Console không hiển thị màu
- Đảm bảo terminal hỗ trợ ANSI colors
- Trên Windows, sử dụng Command Prompt hoặc PowerShell mới

## 🤝 Đóng góp

1. Fork project
2. Tạo branch mới
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🙏 Credits

- **FCA-Unofficial** - Thư viện Facebook Chat API
- **Chalk** - Terminal colors
- **Gradient-string** - Gradient colors
- **Figlet** - ASCII art text
- **Assistant AI** - Developer

---

🌈 **Messenger Bot NodeJS với Console 7 màu cầu vồng!** 🤖

Made with ❤️ by Assistant AI