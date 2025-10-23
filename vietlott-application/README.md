vietlott-application/
├── package.json
├── index.js                # Điểm khởi đầu của ứng dụng
├── routes/                 # Các định tuyến API
│   └── ticketRoutes.js     # Xử lý các yêu cầu liên quan đến vé số
|   └── api/
|       └── ticketRoutes.js
├── controllers/            # Logic xử lý cho các route
│   └── ticketController.js # Xử lý nghiệp vụ vé số
├── models/                 # Định nghĩa dữ liệu (nếu dùng DB)
│   └── ticketModel.js      # Mô hình dữ liệu vé số
├── services/               # Các hàm xử lý nghiệp vụ phức tạp
│   └── vietlottService.js  # Xử lý logic quay số, kiểm tra vé
├── utils/                  # Các tiện ích dùng chung
│   └── validator.js        # Hàm kiểm tra dữ liệu đầu vào
├── config/                 # Cấu hình ứng dụng
│   └── db.js               # Kết nối cơ sở dữ liệu
├── public/                 # Tài nguyên tĩnh (ảnh, CSS, JS client)
├── views/                  # Giao diện nếu dùng template engine
│   └── index.ejs           # Trang chủ (nếu dùng EJS)
└── README.md               # Tài liệu mô tả dự án

