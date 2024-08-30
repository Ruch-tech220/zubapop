import React, { useEffect, useState } from 'react';
import axios from 'axios';
import provinces from '../data/provinces'; // นำเข้า provinces

const WeatherForecast = () => {
    const [forecast, setForecast] = useState([]);
    const [city, setCity] = useState(provinces[0].name); // เริ่มต้นที่จังหวัดแรกใน provinces
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeatherForecast = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a7eb9b77e07f31e1d15647268b03e60f&units=metric&lang=th`);
                setForecast(response.data.list);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching the weather data', error);
            }
        };

        fetchWeatherForecast();
    }, [city]);

    const handleProvinceChange = (event) => {
        setCity(event.target.value);
        setLoading(true); // รีเซ็ตการโหลดข้อมูลใหม่
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>สภาพอากาศล่วงหน้า 5 วันสำหรับ {city}</h1>
            <select onChange={handleProvinceChange} value={city}>
                {provinces.map((province, index) => (
                    <option key={index} value={province.name}>
                        {province.name}
                    </option>
                ))}
            </select>
            <div>
                {forecast.slice(0, 40).map((weather, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        <p><strong>เวลา:</strong> {new Date(weather.dt * 1000).toLocaleString('th-TH')}</p>
                        <p><strong>อุณหภูมิ:</strong> {weather.main.temp} °C</p>
                        <p><strong>ความชื้น:</strong> {weather.main.humidity} %</p>
                        <p><strong>สภาพอากาศ:</strong> {weather.weather[0].description}</p>
                        <p><img src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} /></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherForecast;
