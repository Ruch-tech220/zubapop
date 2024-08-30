import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import provinces from '../data/provinces'; // หรือเส้นทางที่คุณจัดเก็บไฟล์ provinces
import '../css/LocationPage.css'; // นำเข้าไฟล์ CSS
import '../css/Forcast.css';

const AQI_API_KEY = "47de584d708e209aa1803379fa530fe9221def58";
const WEATHER_API_KEY = "a7eb9b77e07f31e1d15647268b03e60f";

function getColor(pm25) {
    if (pm25 <= 25) return "rgba(0, 255, 0, 1)";
    if (pm25 <= 50) return "rgba(255, 255, 0, 1)";
    if (pm25 <= 100) return "rgba(255, 165, 0, 1)";
    if (pm25 <= 200) return "rgba(255, 0, 0, 1)";
    if (pm25 > 200) return "rgba(128, 0, 128, 1)";
    return "rgba(128, 0, 0, 1)";
}

function getStatus(pm25) {
    if (pm25 <= 25) return "อากาศกำลังดี";
    if (pm25 <= 50) return "อากาศดี";
    if (pm25 <= 100) return "อากาศพอใช้";
    if (pm25 <= 200) return "อากาศแย่";
    if (pm25 > 200) return "อากาศอันตราย";
    return "ไม่ทราบ";
}

function groupByDay(forecast) {
    return forecast.reduce((acc, weather) => {
        const date = new Date(weather.dt * 1000).toLocaleDateString('th-TH');
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(weather);
        return acc;
    }, {});
}

const LocationPage = () => {
    const { postalCode } = useParams();
    const [province, setProvince] = useState(null);
    const [aqiData, setAqiData] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const province = provinces.find(p => p.postalCode === postalCode);
            setProvince(province);

            if (province) {
                try {
                    // Fetch AQI data
                    const aqiResponse = await axios.get(`https://api.waqi.info/feed/geo:${province.lat};${province.lon}/?token=${AQI_API_KEY}`);
                    console.log(aqiResponse.data); // ตรวจสอบข้อมูลที่ได้รับ
                    setAqiData(aqiResponse.data.data);

                    // Fetch weather forecast data
                    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${province.name}&appid=${WEATHER_API_KEY}&units=metric&lang=th`);
                    setForecast(weatherResponse.data.list);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching data", error);
                }
            }
        };

        fetchData();
    }, [postalCode]);

    if (!province) {
        return <div>Province not found</div>;
    }

    if (loading) {
        return <div>Loading data...</div>;
    }

    const pm25 = aqiData?.iaqi?.pm25?.v; // ตรวจสอบโครงสร้างข้อมูลที่ถูกต้อง
    if (pm25 === undefined) {
        return <div>Data not available</div>;
    }

    const color = getColor(pm25);
    const status = getStatus(pm25);

    const groupedForecast = groupByDay(forecast.slice(0, 40));

    return (
        <div className="location-page-container mt-4">
            <div className="container" style={{ border: '2px solid black' }}>
                <h2 className="text-primary">สถานที่คือ: จังหวัด {province.name}</h2>
                <div style={{ backgroundColor: color, color: 'black', border: '1px solid black', padding: '10px' }}>
                    <h4 className="alert-heading">{pm25} - {status}</h4>
                </div>
                <p>{province.description}</p>
                <ul className="place-list">
                    <h3>สถานที่ท่องเที่ยว ที่ไม่ควรพลาด</h3>
                    {province.places.map((place, index) => (
                        <li key={index}>
                            <p className="place-name">{place.name}</p>
                            <img src={place.image} alt={place.name} className="place-image" />
                        </li>
                    ))}
                </ul>

                <h3>พยากรณ์อากาศล่วงหน้า 5 วัน</h3>
                {Object.entries(groupedForecast).map(([date, weathers], index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h4 style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>วันที่: {date}</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {weathers.map((weather, idx) => (
                                <div key={idx} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', flex: '1 0 21%', boxSizing: 'border-box', backgroundColor:'#fff' }}>
                                    <p><strong>เวลา:</strong> {new Date(weather.dt * 1000).toLocaleTimeString('th-TH')}</p>
                                    <p><strong>อุณหภูมิ:</strong> {weather.main.temp} °C</p>
                                    <p><strong>ความชื้น:</strong> {weather.main.humidity} %</p>
                                    <p><strong>สภาพอากาศ:</strong> {weather.weather[0].description}</p>
                                    <p><img src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} /></p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationPage;
