require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Lấy thông tin từ environment variables
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'your_verify_token_here';
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || 'your_page_access_token_here';

// Route để verify webhook với Facebook
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// Route để nhận tin nhắn từ Messenger
app.post('/webhook', (req, res) => {
  const body = req.body;

  if (body.object === 'page') {
    body.entry.forEach(function(entry) {
      const webhookEvent = entry.messaging[0];
      console.log('Received webhook event:', webhookEvent);

      const senderPsid = webhookEvent.sender.id;

      if (webhookEvent.message) {
        handleMessage(senderPsid, webhookEvent.message);
      } else if (webhookEvent.postback) {
        handlePostback(senderPsid, webhookEvent.postback);
      }
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

// Xử lý tin nhắn văn bản
function handleMessage(senderPsid, receivedMessage) {
  let response;

  if (receivedMessage.text) {
    const messageText = receivedMessage.text.toLowerCase();

    // Các phản hồi tự động
    if (messageText.includes('hello') || messageText.includes('hi') || messageText.includes('xin chào')) {
      response = {
        text: 'Xin chào! Tôi là bot của bạn. Tôi có thể giúp gì cho bạn?'
      };
    } else if (messageText.includes('help') || messageText.includes('giúp đỡ')) {
      response = {
        text: 'Đây là những gì tôi có thể làm:\n- Trả lời câu hỏi cơ bản\n- Cung cấp thông tin\n- Chat với bạn!\n\nHãy thử gõ "menu" để xem thêm tùy chọn.'
      };
    } else if (messageText.includes('menu')) {
      response = {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'button',
            text: 'Chọn một tùy chọn:',
            buttons: [
              {
                type: 'postback',
                title: 'Thông tin bot',
                payload: 'INFO'
              },
              {
                type: 'postback',
                title: 'Liên hệ',
                payload: 'CONTACT'
              },
              {
                type: 'web_url',
                title: 'Website',
                url: 'https://github.com'
              }
            ]
          }
        }
      };
    } else if (messageText.includes('thời gian') || messageText.includes('time')) {
      const now = new Date();
      response = {
        text: `Thời gian hiện tại: ${now.toLocaleString('vi-VN')}`
      };
    } else {
      // Phản hồi mặc định
      response = {
        text: `Bạn đã gửi: "${receivedMessage.text}"\n\nTôi đang học cách trả lời tốt hơn! Hãy thử gõ "help" để xem tôi có thể làm gì.`
      };
    }
  } else if (receivedMessage.attachments) {
    response = {
      text: 'Cảm ơn bạn đã gửi file! Tôi đã nhận được rồi.'
    };
  }

  callSendAPI(senderPsid, response);
}

// Xử lý postback (khi user click button)
function handlePostback(senderPsid, receivedPostback) {
  let response;
  const payload = receivedPostback.payload;

  switch(payload) {
    case 'INFO':
      response = {
        text: 'Tôi là một bot Messenger được tạo bằng Node.js và chạy trên Replit. Tôi có thể trò chuyện với bạn và thực hiện các tác vụ đơn giản!'
      };
      break;
    case 'CONTACT':
      response = {
        text: 'Bạn có thể liên hệ với developer qua:\n📧 Email: your-email@example.com\n💻 GitHub: github.com/your-username'
      };
      break;
    default:
      response = {
        text: 'Xin lỗi, tôi không hiểu yêu cầu này.'
      };
  }

  callSendAPI(senderPsid, response);
}

// Gửi tin nhắn qua Messenger API
function callSendAPI(senderPsid, response) {
  const requestBody = {
    recipient: {
      id: senderPsid
    },
    message: response
  };

  axios.post(`https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, requestBody)
    .then(response => {
      console.log('Message sent successfully!');
    })
    .catch(error => {
      console.error('Error sending message:', error.response?.data || error.message);
    });
}

// Route chính để kiểm tra server
app.get('/', (req, res) => {
  res.send(`
    <h1>🤖 Messenger Bot đang hoạt động!</h1>
    <p>✅ Server đã được khởi động thành công</p>
    <p>🔗 Webhook URL: <code>${req.protocol}://${req.get('host')}/webhook</code></p>
    <p>⚙️ Port: ${PORT}</p>
    <hr>
    <h3>Hướng dẫn setup:</h3>
    <ol>
      <li>Tạo Facebook App tại <a href="https://developers.facebook.com" target="_blank">developers.facebook.com</a></li>
      <li>Thêm Messenger product</li>
      <li>Cấu hình Webhook với URL: <code>${req.protocol}://${req.get('host')}/webhook</code></li>
      <li>Cập nhật VERIFY_TOKEN và PAGE_ACCESS_TOKEN trong file .env</li>
    </ol>
  `);
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Bot Messenger đang chạy trên port ${PORT}`);
  console.log(`🔗 Webhook URL: http://localhost:${PORT}/webhook`);
  console.log(`⚠️  Hãy đảm bảo đã cấu hình VERIFY_TOKEN và PAGE_ACCESS_TOKEN!`);
});