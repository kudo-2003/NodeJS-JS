const express = require('express');
const router = express.Router();
const ticketController = require();

// Lấy danh sách tất cả vé
router.get('/', ticketController.getAllTickets);

// Tạo vé mới
router.post('/', ticketController.createTicket);

// Kiểm tra vé có trúng không
router.post('/check', ticketController.checkTicket);

// Lấy thông tin vé theo ID
router.get('/:id', ticketController.getTicketById);

module.exports = router;