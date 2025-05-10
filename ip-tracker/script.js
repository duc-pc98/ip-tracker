document.addEventListener('DOMContentLoaded', () => {
    const infoContainer = document.getElementById('info-container');

    // Lấy thông tin User-Agent (thông tin trình duyệt và hệ điều hành)
    const userAgent = navigator.userAgent;

    // Lấy thông tin kích thước màn hình
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Gửi yêu cầu đến backend để lấy địa chỉ IP và lưu trữ thông tin
    fetch('/api/track', { // Thay '/api/track' bằng URL backend thực tế của bạn
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userAgent: userAgent,
            screenWidth: screenWidth,
            screenHeight: screenHeight
        })
    })
    .then(response => response.json())
    .then(data => {
        // Hiển thị thông tin nhận được từ backend
        infoContainer.innerHTML = `
            <p>Địa chỉ IP: ${data.ip || 'Không xác định'}</p>
            <p>User Agent: ${userAgent}</p>
            <p>Kích thước màn hình: ${screenWidth}x${screenHeight}</p>
        `;
    })
    .catch(error => {
        console.error('Lỗi khi gửi yêu cầu theo dõi:', error);
        infoContainer.innerHTML = '<p>Không thể thu thập thông tin.</p>';
    });
});