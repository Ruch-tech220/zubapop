import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Weather = () => {
    const [aqiData, setAqiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/aqi');
                const formattedData = response.data.map(item => ({
                    id: item.id,
                    province: item.province,
                    aqi: item.aqi,
                    dew: typeof item.dew === 'number' ? item.dew.toFixed(2) : null,
                    humidity: typeof item.humidity === 'number' ? item.humidity.toFixed(2) : null,
                    pressure: typeof item.pressure === 'number' ? item.pressure.toFixed(2) : null,
                    pm10: item.pm10,
                    pm25: item.pm25,
                    rain: item.rain,
                    temperature: typeof item.temperature === 'number' ? item.temperature.toFixed(2) : null,
                    wind: typeof item.wind === 'number' ? item.wind.toFixed(2) : null,
                    timestamp: item.timestamp,
                    timezone: item.timezone
                }));

                setAqiData(formattedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (aqiData.length > 0) {
            const filtered = aqiData.filter(item =>
                new Date(item.timestamp).toDateString() === selectedDate.toDateString()
            );
            setFilteredData(filtered);
        }
    }, [selectedDate, aqiData]);

    if (loading) return <div className="alert alert-info">Loading...</div>;
    if (error) return <div className="alert alert-danger">Error: {error}</div>;

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">ข้อมูลคุณภาพอากาศ (AQI)</h1>
            <div className="mb-3">
                <label className="mr-2">เลือกวันที่:</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="form-control d-inline-block"
                />
            </div>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>จังหวัด</th>
                        <th>AQI</th>
                        <th>Dew Point</th>
                        <th>ความชื้น</th>
                        <th>ความดัน</th>
                        <th>PM10</th>
                        <th>PM2.5</th>
                        <th>ฝน</th>
                        <th>อุณหภูมิ</th>
                        <th>ลม</th>
                        <th>เวลา</th>
                        <th>เขตเวลา</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.province}</td>
                                <td>{item.aqi}</td>
                                <td>{item.dew}</td>
                                <td>{item.humidity}</td>
                                <td>{item.pressure}</td>
                                <td>{item.pm10}</td>
                                <td>{item.pm25}</td>
                                <td>{item.rain !== null ? item.rain : 'ไม่มีข้อมูล'}</td>
                                <td>{item.temperature}</td>
                                <td>{item.wind}</td>
                                <td>{new Date(item.timestamp).toLocaleString()}</td>
                                <td>{item.timezone}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="13" className="text-center">ไม่มีข้อมูลสำหรับวันที่นี้</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Weather;
