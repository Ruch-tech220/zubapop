<?php
// กำหนดค่าเชื่อมต่อฐานข้อมูล
$servername = "localhost"; // เปลี่ยนให้เป็นชื่อเซิร์ฟเวอร์ของคุณ
$username = "root"; // ชื่อผู้ใช้ฐานข้อมูล
$password = ""; // รหัสผ่านของฐานข้อมูล
$dbname = "aqi_db"; // ชื่อฐานข้อมูล

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// รายชื่อจังหวัดในรูปแบบอาร์เรย์
$provinces = [
    ['name' => 'Krabi', 'lat' => 8.0863, 'lon' => 98.9063],
    ['name' => 'Bangkok', 'lat' => 13.7563, 'lon' => 100.5018],
    ['name' => 'Kanchanaburi', 'lat' => 14.0018, 'lon' => 99.5324],
    ['name' => 'Kalasin', 'lat' => 16.4213, 'lon' => 103.5083],
    ['name' => 'Kamphaeng Phet', 'lat' => 16.4750, 'lon' => 99.5228],
    ['name' => 'Khon Kaen', 'lat' => 16.4456, 'lon' => 102.8352],
    ['name' => 'Chanthaburi', 'lat' => 12.6129, 'lon' => 102.1121],
    ['name' => 'Chachoengsao', 'lat' => 13.6883, 'lon' => 101.0808],
    ['name' => 'Chonburi', 'lat' => 13.3617, 'lon' => 100.9854],
    ['name' => 'Chainat', 'lat' => 15.1876, 'lon' => 100.1207],
    ['name' => 'Chaiyaphum', 'lat' => 15.8122, 'lon' => 102.0369],
    ['name' => 'Chumphon', 'lat' => 10.4989, 'lon' => 99.1815],
    ['name' => 'Chiang Rai', 'lat' => 19.9108, 'lon' => 99.8364],
    ['name' => 'Chiang Mai', 'lat' => 18.7894, 'lon' => 98.9853],
    ['name' => 'Trang', 'lat' => 7.5537, 'lon' => 99.6228],
    ['name' => 'Trat', 'lat' => 12.2369, 'lon' => 102.5247],
    ['name' => 'Tak', 'lat' => 16.8874, 'lon' => 99.1256],
    ['name' => 'Nakhon Nayok', 'lat' => 14.2136, 'lon' => 101.3623],
    ['name' => 'Nakhon Pathom', 'lat' => 13.8147, 'lon' => 100.0383],
    ['name' => 'Nakhon Phanom', 'lat' => 17.4178, 'lon' => 104.7705],
    ['name' => 'Nakhon Ratchasima', 'lat' => 14.9757, 'lon' => 102.0981],
    ['name' => 'Nakhon Si Thammarat', 'lat' => 8.4316, 'lon' => 99.9756],
    ['name' => 'Nakhon Sawan', 'lat' => 15.6985, 'lon' => 100.1328],
    ['name' => 'Nonthaburi', 'lat' => 13.8584, 'lon' => 100.5232],
    ['name' => 'Narathiwat', 'lat' => 6.4307, 'lon' => 101.8146],
    ['name' => 'Nan', 'lat' => 18.7703, 'lon' => 100.7877],
    ['name' => 'Bueng Kan', 'lat' => 18.2417, 'lon' => 103.6463],
    ['name' => 'Buriram', 'lat' => 15.0063, 'lon' => 103.1027],
    ['name' => 'Pathum Thani', 'lat' => 14.0352, 'lon' => 100.5315],
    ['name' => 'Prachuap Khiri Khan', 'lat' => 11.8158, 'lon' => 99.8193],
    ['name' => 'Prachinburi', 'lat' => 14.0516, 'lon' => 101.3747],
    ['name' => 'Pattani', 'lat' => 6.8654, 'lon' => 101.2522],
    ['name' => 'Phrautthabat', 'lat' => 14.3513, 'lon' => 100.5611],
    ['name' => 'Phang Nga', 'lat' => 8.4499, 'lon' => 98.5331],
    ['name' => 'Phatthalung', 'lat' => 7.6182, 'lon' => 100.0871],
    ['name' => 'Phichit', 'lat' => 16.3608, 'lon' => 100.0890],
    ['name' => 'Phitsanulok', 'lat' => 16.8235, 'lon' => 100.2658],
    ['name' => 'Phetchaburi', 'lat' => 13.1107, 'lon' => 99.9421],
    ['name' => 'Phetchabun', 'lat' => 16.4195, 'lon' => 101.1578],
    ['name' => 'Phrae', 'lat' => 18.1546, 'lon' => 100.1416],
    ['name' => 'Phuket', 'lat' => 7.8941, 'lon' => 98.3518],
    ['name' => 'Maha Sarakham', 'lat' => 16.1851, 'lon' => 103.3001],
    ['name' => 'Mukdahan', 'lat' => 16.5444, 'lon' => 104.7296],
    ['name' => 'Mae Hong Son', 'lat' => 19.1771, 'lon' => 97.9676],
    ['name' => 'Yasothon', 'lat' => 15.7961, 'lon' => 104.1509],
    ['name' => 'Yala', 'lat' => 6.5408, 'lon' => 101.2803],
    ['name' => 'Roi Et', 'lat' => 16.0495, 'lon' => 103.6433],
    ['name' => 'Ranong', 'lat' => 9.9672, 'lon' => 98.6337],
    ['name' => 'Rayong', 'lat' => 12.6693, 'lon' => 101.2818],
    ['name' => 'Ratchaburi', 'lat' => 13.5287, 'lon' => 99.8185],
    ['name' => 'Lopburi', 'lat' => 14.8114, 'lon' => 100.6460],
    ['name' => 'Lampang', 'lat' => 18.2925, 'lon' => 99.4946],
    ['name' => 'Lamphun', 'lat' => 18.5823, 'lon' => 99.0184],
    ['name' => 'Loei', 'lat' => 17.4766, 'lon' => 101.7366],
    ['name' => 'Sisaket', 'lat' => 15.1158, 'lon' => 104.3240],
    ['name' => 'Sakon Nakhon', 'lat' => 17.1635, 'lon' => 104.1481],
    ['name' => 'Songkhla', 'lat' => 7.2056, 'lon' => 100.5998],
    ['name' => 'Satun', 'lat' => 6.6211, 'lon' => 100.0686],
    ['name' => 'Samut Prakan', 'lat' => 13.5937, 'lon' => 100.6067],
    ['name' => 'Samut Songkhram', 'lat' => 13.4106, 'lon' => 99.9961],
    ['name' => 'Samut Sakhon', 'lat' => 13.5473, 'lon' => 100.2942],
    ['name' => 'Sa Kaeo', 'lat' => 13.7438, 'lon' => 102.0531],
    ['name' => 'Saraburi', 'lat' => 14.5261, 'lon' => 100.9155],
    ['name' => 'Sing Buri', 'lat' => 14.8882, 'lon' => 100.3959],
    ['name' => 'Sukhothai', 'lat' => 17.0129, 'lon' => 99.8245],
    ['name' => 'Suphan Buri', 'lat' => 14.4694, 'lon' => 100.1214],
    ['name' => 'Surat Thani', 'lat' => 9.1366, 'lon' => 99.3329],
    ['name' => 'Surin', 'lat' => 14.8527, 'lon' => 103.4878],
    ['name' => 'Nong Khai', 'lat' => 17.8804, 'lon' => 102.7381],
    ['name' => 'Nong Bua Lamphu', 'lat' => 17.1750, 'lon' => 102.4260],
    ['name' => 'Ang Thong', 'lat' => 15.5998, 'lon' => 100.4409],
    ['name' => 'Udon Thani', 'lat' => 17.4232, 'lon' => 102.8010],
    ['name' => 'Uttaradit', 'lat' => 17.6214, 'lon' => 100.0983],
    ['name' => 'Uthai Thani', 'lat' => 15.3716, 'lon' => 99.9858],
    ['name' => 'Ubon Ratchathani', 'lat' => 15.2358, 'lon' => 104.8508],
    ['name' => 'Amnat Charoen', 'lat' => 15.8647, 'lon' => 104.6269],
    ['name' => 'Phayao', 'lat' => 19.1627, 'lon' => 99.8839]
];

// วนลูปเพื่อดึงข้อมูลจาก API สำหรับแต่ละจังหวัด
foreach ($provinces as $province) {
    $name = $province['name'];
    $lat = $province['lat'];
    $lon = $province['lon'];
    
    // สร้าง URL สำหรับการเรียก API
    $apiUrl = "https://api.waqi.info/feed/geo:{$lat};{$lon}/?token=47de584d708e209aa1803379fa530fe9221def58";

    // ใช้ cURL เพื่อดึงข้อมูลจาก API
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    
    // แปลงข้อมูล JSON เป็นอาร์เรย์
    $data = json_decode($response, true);

    // ตรวจสอบว่ามีข้อมูลและเก็บข้อมูลที่ต้องการในตัวแปร
    if (isset($data['data'])) {
        $result = $data['data'];
        
        // ดึงข้อมูลที่ต้องการ
        $co = $result['iaqi']['co']['v'] ?? null; // คาร์บอนมอนอกไซด์
        $h = $result['iaqi']['h']['v'] ?? null; // ความชื้น
        $no2 = $result['iaqi']['no2']['v'] ?? null; // ไนโตรเจนไดออกไซด์
        $o3 = $result['iaqi']['o3']['v'] ?? null; // โอโซน
        $p = $result['iaqi']['p']['v'] ?? null; // ความดัน
        $pm10 = $result['iaqi']['pm10']['v'] ?? null; // PM10
        $pm25 = $result['iaqi']['pm25']['v'] ?? null; // PM2.5
        $r = $result['iaqi']['r']['v'] ?? null; // ปริมาณน้ำฝน
        $so2 = $result['iaqi']['so2']['v'] ?? null; // ซัลเฟอร์ไดออกไซด์
        $t = $result['iaqi']['t']['v'] ?? null; // อุณหภูมิ
        $w = $result['iaqi']['w']['v'] ?? null; // ความเร็วลม
        $s = $result['time']['s'] ?? null; // เวลา

        // สร้างคำสั่ง SQL สำหรับการบันทึกข้อมูลลงในฐานข้อมูล
        $sql = "INSERT INTO air_quality (province_name, co, humidity, no2, o3, pressure, pm10, pm25, rain, so2, temperature, wind, recorded_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        // เตรียมคำสั่ง SQL
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sddddddddddds", $name, $co, $h, $no2, $o3, $p, $pm10, $pm25, $r, $so2, $t, $w, $s);
        
        // ส่งคำสั่ง SQL
        if ($stmt->execute()) {
            echo "บันทึกข้อมูลสำเร็จสำหรับจังหวัด: " . $name . "<br>";
        } else {
            echo "เกิดข้อผิดพลาดในการบันทึกข้อมูล: " . $stmt->error . "<br>";
        }
        
        // ปิดคำสั่ง SQL
        $stmt->close();
    } else {
        echo "ไม่พบข้อมูลสำหรับจังหวัด: " . $name . "<br>";
    }
}

// ปิดการเชื่อมต่อฐานข้อมูล
$conn->close();
?>