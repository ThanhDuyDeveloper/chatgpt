#!/bin/bash

echo "🚀 SETTING UP MESSENGER BOT FOR GITHUB..."

# Tạo .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# AppState (sensitive data)
appstate.json

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Replit files
.replit.nix
EOF

# Tạo file README cho GitHub
cat > README-GITHUB.md << 'EOF'
# 🤖 Messenger Bot NodeJS với Console 7 màu 🌈

[![Deploy to Replit](https://replit.com/badge/github/YOUR_USERNAME/messenger-bot-nodejs)](https://replit.com/@YOUR_USERNAME/messenger-bot-nodejs)

> Bot Messenger tuyệt đẹp với console 7 màu cầu vồng, tương thích hoàn hảo với Replit!

## 🚀 Deploy nhanh trên Replit:

1. **Click vào nút "Deploy to Replit" ở trên**
2. **Hoặc:**
   - Vào [Replit](https://replit.com)
   - Chọn "Import from GitHub" 
   - Paste link repo này
   - Click "Import"

3. **Cấu hình AppState:**
   - Lấy AppState từ Facebook (xem hướng dẫn trong README.md)
   - Tạo file `appstate.json` và paste AppState vào
   - Chạy `npm start`

## ✨ Features:
- 🌈 Console 7 màu cầu vồng
- 🤖 Bot Messenger tự động  
- 📝 4 Commands ready
- 🎭 2 Events ready
- ☁️ Replit compatible

Made with ❤️ by Assistant AI
EOF

echo "✅ GitHub setup complete!"
echo ""
echo "📋 NEXT STEPS:"
echo "1. Tạo GitHub repository mới"
echo "2. git init"
echo "3. git add ."
echo "4. git commit -m 'Initial commit: Messenger Bot with 7-color console'"
echo "5. git remote add origin YOUR_REPO_URL"
echo "6. git push -u origin main"
echo ""
echo "🔗 Sau đó import vào Replit từ GitHub URL!"