// ...existing code...
const express = require('express');
const path = require('path');
const app = express();           // Ứng dụng chính

// Tắt header mặc định, parse JSON
app.disable('x-powered-by');
app.use(express.json());

// 🧠 Biến cục bộ cấp ứng dụng
app.locals.title = 'Ứng dụng Vietlott';
app.locals.email = 'hotro@vietlott.vn';

// Serve static UI từ vietlott-ui/public
const uiDir = path.join(__dirname, '..', 'vietlott-ui', 'public');
app.use(express.static(uiDir, {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders(res) {
    res.set('x-timestamp', new Date().toUTCString());
  }
}));

// Mount API routes (nếu có)
try {
  const ticketRoutes = require('./routes/api/ticketRoutes');
  app.use('/api/tickets', ticketRoutes);
} catch (e) {
  console.warn('Không tìm thấy ticketRoutes, bỏ qua mount /api/tickets');
}

// Route chính (trả về index.html của UI)
app.get('/', (req, res) => {
  res.sendFile(path.join(uiDir, 'index.html'));
});

// Tùy chọn: đường dẫn admin
app.get('/admin', (req, res) => {
  const adminFile = path.join(uiDir, 'admin.html');
  if (require('fs').existsSync(adminFile)) return res.sendFile(adminFile);
  res.send('<h2>Trang quản trị</h2>');
});

// 404 + error handler tối giản
app.use((req, res) => res.status(404).send('404 - Không tìm thấy'));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('500 - Lỗi máy chủ');
});

// 🚀 Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
// ...existing code...