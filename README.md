# 🤖 Bot Messenger NodeJS

Bot Messenger được tạo bằng NodeJS và chạy trên Replit.

## 🚀 Tính năng

- ✅ Trả lời tin nhắn tự động
- ✅ Hỗ trợ button và template
- ✅ Xử lý postback
- ✅ Hiển thị thời gian
- ✅ Menu tương tác
- ✅ **Console startup đẹp với 7 màu sắc**
- ✅ **ASCII Art banner khi khởi động**
- ✅ **Log messages có màu sắc chuyên nghiệp**
- ✅ **Loading animation khi startup**
- ✅ Dễ dàng mở rộng

## 📋 Hướng dẫn Setup

### 1. Trên Replit:
1. Fork hoặc clone project này
2. Chạy `npm install` để cài đặt dependencies
3. Copy `.env.example` thành `.env`
4. Cấu hình environment variables trong file `.env`

### 2. Tạo Facebook App:
1. Truy cập [Facebook Developers](https://developers.facebook.com)
2. Tạo App mới, chọn "Business"
3. Thêm sản phẩm "Messenger"
4. Trong phần Messenger Settings:
   - Tạo Page Access Token
   - Setup Webhooks với URL: `https://your-replit-url.replit.dev/webhook`
   - Chọn events: `messages`, `messaging_postbacks`

### 3. Cấu hình Webhook:
- **Callback URL**: `https://your-replit-url.replit.dev/webhook`
- **Verify Token**: Token bạn tự tạo (ghi trong file `.env`)
- **Subscription Fields**: `messages`, `messaging_postbacks`

## 🔧 Environment Variables

```bash
VERIFY_TOKEN=your_verify_token_here
PAGE_ACCESS_TOKEN=your_page_access_token_here
PORT=3000
```

## 🎯 Cách sử dụng

1. Gửi tin nhắn "hello" hoặc "xin chào" để chào hỏi
2. Gửi "help" để xem hướng dẫn
3. Gửi "menu" để hiển thị menu tương tác
4. Gửi "thời gian" để xem thời gian hiện tại

## 🎨 Console Features

Bot có console startup cực kỳ đẹp mắt với:

- 🌈 **ASCII Art Banner** - Tên bot hiển thị bằng ASCII art nhiều màu
- ⚡ **Loading Animation** - Hiệu ứng loading spinner khi khởi động
- 📊 **System Information** - Hiển thị đầy đủ thông tin hệ thống
- 🔗 **Quick Links** - Các đường dẫn quan trọng
- ⚙️ **Environment Status** - Kiểm tra cấu hình
- 📝 **Commands List** - Danh sách lệnh có sẵn
- 🎯 **Colored Logs** - Log messages theo từng loại với màu sắc riêng:
  - 📘 **INFO** - Thông tin chung (xanh dương)
  - ✅ **SUCCESS** - Thành công (xanh lá)
  - ⚠️ **WARNING** - Cảnh báo (vàng)
  - ❌ **ERROR** - Lỗi (đỏ)
  - 🪝 **WEBHOOK** - Sự kiện webhook (tím)
  - 💬 **MESSAGE** - Tin nhắn từ user (cyan)

### Demo Console:
```bash
npm run demo  # Xem demo console đẹp
```

## 📁 Cấu trúc Project

```
├── index.js          # File chính của bot
├── package.json      # Dependencies và scripts
├── .env.example      # Mẫu environment variables
├── .replit          # Cấu hình Replit
├── utils/
│   └── console.js    # Console đẹp và log functions
└── README.md        # Hướng dẫn (file này)
```

## 🛠️ Phát triển

Để thêm tính năng mới:

1. Chỉnh sửa hàm `handleMessage()` trong `index.js`
2. Thêm các case mới trong switch statement
3. Tạo response templates theo ý muốn

## 📝 Commands có sẵn

- `hello`, `hi`, `xin chào` - Chào hỏi
- `help`, `giúp đỡ` - Hiển thị hướng dẫn
- `menu` - Hiển thị menu button
- `thời gian`, `time` - Hiển thị thời gian hiện tại

## 🔗 Links hữu ích

- [Facebook Messenger Platform Docs](https://developers.facebook.com/docs/messenger-platform)
- [Replit Docs](https://docs.replit.com)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

---

Made with ❤️ for Vietnamese developers