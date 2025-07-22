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

// เช็ควันที่ที่ถูกส่งมา
$date = isset($_GET['date']) ? $_GET['date'] : date('Y-m-d');

// สร้างคำสั่ง SQL สำหรับการดึงข้อมูลจากฐานข้อมูล โดยเลือกตามวันที่
$sql = "SELECT * FROM air_quality WHERE DATE(recorded_time) = '$date' ORDER BY id DESC LIMIT 77"; 
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
        'message' => 'ไม่พบข้อมูลสำหรับวันที่นี้'
    ];
}

// ปิดการเชื่อมต่อฐานข้อมูล
$conn->close();

// ถ้าขอข้อมูลด้วย AJAX
if (isset($_GET['ajax'])) {
    header('Content-Type: application/json');
    echo json_encode($results);
    exit;
}
?>

<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>แสดงข้อมูลคุณภาพอากาศ</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 1000px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            text-align: center;
        }

        form {
            margin-bottom: 20px;
        }

        input[type="date"] {
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th, td {
            padding: 10px;
            border: 1px solid #ccc;
            text-align: center;
        }

        th {
            background-color: #f2f2f2;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
    </style>
    <script>
        function fetchData(date) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `?date=${date}&ajax=true`, true);
            xhr.onload = function () {
                if (this.status === 200) {
                    const results = JSON.parse(this.responseText);
                    const resultsTable = document.getElementById('results');

                    // ล้างข้อมูลในตาราง
                    resultsTable.innerHTML = `
                        <thead>
                            <tr>
                                <th>จังหวัด</th>
                                <th>CO</th>
                                <th>ความชื้น</th>
                                <th>NO2</th>
                                <th>O3</th>
                                <th>ความดัน</th>
                                <th>PM10</th>
                                <th>PM2.5</th>
                                <th>ฝนตก</th>
                                <th>SO2</th>
                                <th>อุณหภูมิ</th>
                                <th>ลม</th>
                                <th>บันทึกเมื่อ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td colspan="13">กำลังโหลดข้อมูล...</td></tr>
                        </tbody>
                    `;

                    const tbody = resultsTable.querySelector('tbody');
                    tbody.innerHTML = '';

                    if (results.length > 0) {
                        results.forEach(result => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${result.province}</td>
                                <td>${result.co}</td>
                                <td>${result.humidity}%</td>
                                <td>${result.no2}</td>
                                <td>${result.o3}</td>
                                <td>${result.pressure} hPa</td>
                                <td>${result.pm10} µg/m³</td>
                                <td>${result.pm25} µg/m³</td>
                                <td>${result.rain} mm</td>
                                <td>${result.so2}</td>
                                <td>${result.temperature} °C</td>
                                <td>${result.wind} km/h</td>
                                <td>${result.recorded_time}</td>
                            `;
                            tbody.appendChild(row);
                        });
                    } else {
                        tbody.innerHTML = '<tr><td colspan="13">ไม่พบข้อมูล</td></tr>';
                    }
                }
            };
            xhr.send();
        }

        document.addEventListener('DOMContentLoaded', function () {
            const dateInput = document.getElementById('date');
            dateInput.addEventListener('change', function () {
                fetchData(this.value);
            });
            // เรียกข้อมูลเบื้องต้น
            fetchData(dateInput.value);
        });
    </script>
</head>
<body>
    <div class="container">
        <h1>ข้อมูลคุณภาพอากาศย้อนหลัง</h1>
        <form>
            <label for="date">เลือกวันที่:</label>
            <input type="date" id="date" name="date" value="<?php echo $date; ?>" required>
        </form>

        <table id="results">
            <thead>
                <tr>
                    <th>จังหวัด</th>
                    <th>CO</th>
                    <th>ความชื้น</th>
                    <th>NO2</th>
                    <th>O3</th>
                    <th>ความดัน</th>
                    <th>PM10</th>
                    <th>PM2.5</th>
                    <th>ฝนตก</th>
                    <th>SO2</th>
                    <th>อุณหภูมิ</th>
                    <th>ลม</th>
                    <th>บันทึกเมื่อ</th>
                </tr>
            </thead>
            <tbody>
                <?php
                // แสดงข้อมูลผลลัพธ์เมื่อโหลดหน้า
                if (!empty($results)) {
                    foreach ($results as $result) {
                        echo "<tr>";
                        echo "<td>" . $result['province'] . "</td>";
                        echo "<td>" . $result['co'] . "</td>";
                        echo "<td>" . $result['humidity'] . "%</td>";
                        echo "<td>" . $result['no2'] . "</td>";
                        echo "<td>" . $result['o3'] . "</td>";
                        echo "<td>" . $result['pressure'] . " hPa</td>";
                        echo "<td>" . $result['pm10'] . " µg/m³</td>";
                        echo "<td>" . $result['pm25'] . " µg/m³</td>";
                        echo "<td>" . $result['rain'] . " mm</td>";
                        echo "<td>" . $result['so2'] . "</td>";
                        echo "<td>" . $result['temperature'] . " °C</td>";
                        echo "<td>" . $result['wind'] . " km/h</td>";
                        echo "<td>" . $result['recorded_time'] . "</td>";
                        echo "</tr>";
                    }
                } else {
                    echo "<tr><td colspan='13'>ไม่พบข้อมูล</td></tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
</body>
</html>
