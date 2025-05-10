<?php
// Lấy địa chỉ IP
$ip_address = $_SERVER['REMOTE_ADDR'];

// Lấy thông tin User Agent (thường chứa thông tin trình duyệt và hệ điều hành)
$user_agent = $_SERVER['HTTP_USER_AGENT'];

// Nhận thông tin bổ sung từ client-side (nếu có)
$device_info_json = file_get_contents('php://input');
$device_info = json_decode($device_info_json, true);

// Chuẩn bị dữ liệu để lưu
$log_entry = "Thời gian: " . date("Y-m-d H:i:s") . "\n";
$log_entry .= "Địa chỉ IP: " . $ip_address . "\n";
$log_entry .= "User Agent: " . $user_agent . "\n";

if ($device_info) {
    foreach ($device_info as $key => $value) {
        $log_entry .= ucfirst(str_replace('_', ' ', $key)) . ": " . htmlspecialchars($value) . "\n";
    }
}
$log_entry .= "--------------------------------------\n";

// Ghi vào tệp (ví dụ: logs.txt)
// CẢNH BÁO: Đảm bảo tệp này không thể truy cập công khai từ web và có quyền ghi phù hợp.
// Cân nhắc sử dụng cơ sở dữ liệu cho giải pháp an toàn và có thể mở rộng hơn.
file_put_contents('logs.txt', $log_entry, FILE_APPEND | LOCK_EX);

// Bạn có thể trả về một phản hồi nhỏ nếu cần
// header('Content-Type: application/json');
// echo json_encode(['status' => 'success', 'message' => 'Thông tin đã được ghi lại.']);
?>