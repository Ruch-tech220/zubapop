const express = require('express'); // ใช้ Express เพื่อสร้างเซิร์ฟเวอร์
const mysql = require('mysql2'); // ใช้ mysql2 สำหรับเชื่อมต่อกับฐานข้อมูล MySQL
const axios = require('axios'); // ใช้ Axios สำหรับการเรียก API
const app = express(); // สร้าง instance ของ Express
const port = 3001; // กำหนดพอร์ตที่เซิร์ฟเวอร์จะรัน
const cron = require('node-cron'); // ใช้ cron สำหรับการตั้งเวลารันอัตโนมัติ
const cors = require('cors'); // นำเข้า CORS

// นำเข้า provinces จากไฟล์ที่สร้างไว้
const provinces = require('./provinces'); // นำเข้าข้อมูลจังหวัดจากไฟล์ provinces.js

// Token สำหรับการเข้าถึง API
const token = '47de584d708e209aa1803379fa530fe9221def58'; // ใส่ token ของคุณ

// เชื่อมต่อกับฐานข้อมูล MySQL
const db = mysql.createConnection({
    host: 'localhost', // ชื่อโฮสต์ของฐานข้อมูล
    user: 'root', // ชื่อผู้ใช้ฐานข้อมูล
    password: '', // เปลี่ยนเป็นรหัสผ่านของคุณ
    database: 'aqi_db' // ชื่อฐานข้อมูลที่คุณต้องการเชื่อมต่อ
});

app.use(cors()); // เพิ่มบรรทัดนี้

// เชื่อมต่อกับฐานข้อมูล
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err); // แสดงข้อผิดพลาดถ้าไม่สามารถเชื่อมต่อได้
        return;
    }
    console.log('Connected to the MySQL database'); // แสดงข้อความเมื่อเชื่อมต่อสำเร็จ
});

// ฟังก์ชันสำหรับดึงและบันทึกข้อมูล AQI
async function fetchAndSaveAQIData() {
    try {
        const results = []; // สร้าง array สำหรับเก็บผลลัพธ์

        // วนลูปผ่านจังหวัดทั้งหมด
        for (const province of provinces) {
            // เรียก API เพื่อดึงข้อมูล AQI
            const response = await axios.get(
                `https://api.waqi.info/feed/geo:${province.lat};${province.lon}/?token=${token}`
            );

            // ดึงค่า AQI และข้อมูลอื่น ๆ จากการตอบกลับ
            const aqi = response.data.data.aqi;
            const iaqi = response.data.data.iaqi;
            const time = response.data.data.time;

            // บันทึกข้อมูลลง MySQL
            const query = `
                INSERT INTO aqi_data (
                    province, aqi, dew, humidity, pressure, pm10, pm25, rain, temperature, wind, timestamp, timezone
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            db.query(query, [
                province.name,
                aqi,
                iaqi.dew ? iaqi.dew.v : null, // ตรวจสอบว่ามี dew หรือไม่
                iaqi.h ? iaqi.h.v : null, // ตรวจสอบว่ามี humidity หรือไม่
                iaqi.p ? iaqi.p.v : null, // ตรวจสอบว่ามี pressure หรือไม่
                iaqi.pm10 ? iaqi.pm10.v : null, // ตรวจสอบว่ามี pm10 หรือไม่
                iaqi.pm25 ? iaqi.pm25.v : null, // ตรวจสอบว่ามี pm25 หรือไม่
                iaqi.r ? iaqi.r.v : null, // ตรวจสอบว่ามี rain หรือไม่
                iaqi.t ? iaqi.t.v : null, // ตรวจสอบว่ามี temperature หรือไม่
                iaqi.w ? iaqi.w.v : null, // ตรวจสอบว่ามี wind หรือไม่
                time.s, // เวลาที่ดึงจาก API
                time.tz  // Timezone
            ], (err, result) => {
                if (err) {
                    console.error('Error inserting data:', err); // แสดงข้อผิดพลาดถ้าไม่สามารถบันทึกข้อมูลได้
                } else {
                    console.log(`Inserted data for ${province.name}: AQI ${aqi}`); // แสดงข้อความเมื่อบันทึกข้อมูลสำเร็จ
                }
            });

            // เก็บผลลัพธ์ใน array
            results.push({
                province: province.name,
                aqi,
                dew: iaqi.dew ? iaqi.dew.v : null,
                humidity: iaqi.h ? iaqi.h.v : null,
                pressure: iaqi.p ? iaqi.p.v : null,
                pm10: iaqi.pm10 ? iaqi.pm10.v : null,
                pm25: iaqi.pm25 ? iaqi.pm25.v : null,
                rain: iaqi.r ? iaqi.r.v : null,
                temperature: iaqi.t ? iaqi.t.v : null,
                wind: iaqi.w ? iaqi.w.v : null,
                timestamp: time.s,
                timezone: time.tz
            });
        }
        console.log('Data fetched and saved successfully');
    } catch (error) {
        console.error('Error fetching AQI data:', error); // แสดงข้อผิดพลาดเมื่อมีปัญหาในการดึงข้อมูล
    }
}

// ใช้ cron เพื่อรันการดึงข้อมูลเวลา 8:00, 16:00 และ 24:00 ทุกวัน
cron.schedule('0 8,16,0 * * *', () => {
    console.log('Fetching AQI data at scheduled time...');
    fetchAndSaveAQIData();
}, {
    timezone: "Asia/Bangkok" // ตั้งค่า timezone เป็นเวลาประเทศไทย
});


// สร้าง endpoint สำหรับดึงข้อมูล AQI ล่าสุด
app.get('/aqi', async (req, res) => {
    try {
        const query = 'SELECT * FROM aqi_data ORDER BY id DESC LIMIT 385'; // ดึงข้อมูลล่าสุด 385 รายการ
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching data from database:', err);
                res.status(500).send('Error fetching data');
            } else {
                res.json(results); // ส่งผลลัพธ์กลับไปยังผู้ใช้
            }
        });
    } catch (error) {
        console.error('Error in /aqi endpoint:', error); // แสดงข้อผิดพลาดเมื่อมีปัญหาในการดึงข้อมูล
        res.status(500).send('Error fetching AQI data'); // ส่งสถานะข้อผิดพลาดกลับไป
    }
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server running on port ${port}`); // แสดงข้อความเมื่อเซิร์ฟเวอร์เริ่มทำงาน
});
