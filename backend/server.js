const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Chọn một cổng
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

app.post('/api/track', (req, res) => {
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.body.userAgent;
    const screenWidth = req.body.screenWidth;
    const screenHeight = req.body.screenHeight;

    console.log('Thông tin theo dõi:');
    console.log('IP:', clientIP);
    console.log('User Agent:', userAgent);
    console.log('Kích thước màn hình:', screenWidth, 'x', screenHeight);

    // Ở đây bạn có thể lưu trữ thông tin này vào cơ sở dữ liệu nếu cần

    res.json({ ip: clientIP }); // Trả về địa chỉ IP cho frontend
});

app.listen(port, () => {
    console.log(`Backend đang chạy trên cổng ${port}`);
});