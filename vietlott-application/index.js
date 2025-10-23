const express = require('express');
const app = express();           // Ứng dụng chính
const admin = express();         // Ứng dụng phụ (admin)

// 🧠 Biến cục bộ cấp ứng dụng
app.locals.title = 'Ứng dụng Vietlott';
app.locals.email = 'hotro@vietlott.vn';

// 🗂️ Cấu hình phục vụ tệp tĩnh từ thư mục 'public'
const staticOptions = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders(res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
};
app.use(express.static('public', staticOptions));

// 🛣️ Route chính của ứng dụng
app.get('/', (req, res) => {
  res.send(`
    <h1>${app.locals.title}</h1>
    <p>Liên hệ: ${app.locals.email}</p>
    <p>Chào mừng bạn đến với hệ thống kiểm tra vé số Vietlott!</p>
  `);
});

// 🧩 Route trong ứng dụng phụ (admin)
admin.get('/', (req, res) => {
  console.log('Mountpath của admin:', admin.mountpath); // In ra đường dẫn gắn
  res.send(`
    <h2>Trang quản trị Vietlott</h2>
    <p>Đây là khu vực dành cho quản trị viên.</p>
  `);
});

// 🔗 Gắn ứng dụng phụ vào ứng dụng chính
app.use('/admin', admin);

// 🚀 Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
