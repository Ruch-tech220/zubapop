<?php
// กำหนดค่าเชื่อมต่อฐานข้อมูล
$servername = "localhost"; // เปลี่ยนให้เป็นชื่อเซิร์ฟเวอร์ของคุณ
$username = "arm2024_zubapop"; // ชื่อผู้ใช้ฐานข้อมูล
$password = "tZNnzSnXyvx4gFT3pSkS"; // รหัสผ่านของฐานข้อมูล
$dbname = "arm2024_zubapop"; // ชื่อฐานข้อมูล

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// สร้างคำสั่ง SQL สำหรับการดึงข้อมูลจากฐานข้อมูล
$sql = "SELECT * FROM air_quality ORDER BY id DESC LIMIT 77"; // แก้ไขที่นี่
$result = $conn->query($sql);

// สร้างอาร์เรย์เพื่อเก็บผลลัพธ์
$results = [];

if ($result->num_rows > 0) {
    // วนลูปเพื่อดึงข้อมูลแต่ละแถว
    while ($row = $result->fetch_assoc()) {
        $results[] = [
            'province' => $row['province_name'],
            'co' => $row['co'],
            'humidity' => $row['humidity'],
            'no2' => $row['no2'],
            'o3' => $row['o3'],
            'pressure' => $row['pressure'],
            'pm10' => $row['pm10'],
            'pm25' => $row['pm25'],
            'rain' => $row['rain'],
            'so2' => $row['so2'],
            'temperature' => $row['temperature'],
            'wind' => $row['wind'],
            'recorded_time' => $row['recorded_time'],
        ];
    }
} else {
    $results[] = [
        'status' => 'error',
        'message' => 'ไม่พบข้อมูล'
    ];
}

// ปิดการเชื่อมต่อฐานข้อมูล
$conn->close();

// ส่งข้อมูลผลลัพธ์เป็น JSON
header('Content-Type: application/json');
echo json_encode($results);
?>
