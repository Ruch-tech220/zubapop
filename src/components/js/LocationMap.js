import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import { useNavigate, useParams } from 'react-router-dom';
import provinces from '../data/provinces'; // นำเข้าข้อมูลจังหวัดจาก provinces.js

// ฟังก์ชันกำหนดสีตามค่า PM2.5
function getColor(pm25) {
  if (pm25 <= 25) return "rgba(0, 255, 0, 1)";
  if (pm25 <= 50) return "rgba(255, 255, 0, 1)";
  if (pm25 <= 100) return "rgba(255, 165, 0, 1)";
  if (pm25 <= 200) return "rgba(255, 0, 0, 1)";
  if (pm25 > 200) return "rgba(128, 0, 128, 1)";
  return "rgba(128, 0, 0, 1)";
}

// ฟังก์ชันสำหรับแสดงสถานะอากาศตามค่า PM2.5
function getStatus(pm25) {
  if (pm25 <= 25) return "อากาศกำลังดี";
  if (pm25 <= 50) return "อากาศดี";
  if (pm25 <= 100) return "อากาศพอใช้";
  if (pm25 <= 200) return "อากาศแย่";
  if (pm25 > 200) return "อากาศอันตราย";
  return "ไม่ทราบ";
}

// สร้างฟังก์ชันเพื่อสร้าง Marker Icon แบบ Custom พร้อมสีจาก getColor
const createCustomMarker = (pm25) => {
  const backgroundColor = getColor(pm25);
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="color: black; background-color: ${backgroundColor}; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">${pm25}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

// ฟังก์ชันสำหรับการซูมแผนที่ไปยังตำแหน่งที่เลือก
const ZoomToLocation = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 12); // ซูมแผนที่ไปยังตำแหน่ง lat, lng และซูมระดับ 12
    }
  }, [lat, lng, map]);
  return null;
};

const LocationMap = () => {
  const [aqiData, setAqiData] = useState([]);
  const { postalCode } = useParams(); // รับค่า postalCode จาก URL
  const navigate = useNavigate(); // ใช้ navigate สำหรับการเปลี่ยนหน้า
  const [selectedLocation, setSelectedLocation] = useState(null); // เก็บข้อมูลตำแหน่งที่ถูกเลือก
  const [stations, setStations] = useState([]);

  // ฟังก์ชันเพื่อดึงข้อมูล AQI สำหรับแต่ละจังหวัด
  const fetchAqiData = async (lat, lon) => {
    try {
      const response = await axios.get(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=47de584d708e209aa1803379fa530fe9221def58`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching AQI data:', error);
      return null;
    }
  };

  const fetchStations = async () => {
    try {
      const response = await axios.get('https://www.cmuccdc.org/api/ccdc/stations');
      setStations(response.data); // สมมุติว่า response.data จะมีข้อมูลสถานที่ทั้งหมด
    } catch (error) {
      console.error('Error fetching station data:', error);
    }
  };

  useEffect(() => {
    fetchStations(); // ดึงข้อมูลสถานที่เมื่อคอมโพเนนต์ถูกสร้างขึ้น

    // ฟังก์ชันดึงข้อมูล AQI สำหรับทุกจังหวัดใน provinces.js
    const fetchAllAqiData = async () => {
      const aqiPromises = provinces.map(async (province) => {
        const aqi = await fetchAqiData(province.lat, province.lon);
        return { province, aqi };
      });
      const results = await Promise.all(aqiPromises);
      setAqiData(results.filter(result => result.aqi));
    };

    fetchAllAqiData(); // ดึงข้อมูล AQI เมื่อโหลดคอมโพเนนต์
  }, []);

  useEffect(() => {
    // หากมี postalCode ใน URL จะเลือกตำแหน่งที่ตรงกับ postalCode นั้น
    if (postalCode && provinces.length > 0) {
      const location = provinces.find(province => province.postalCode === postalCode);
      if (location) {
        setSelectedLocation(location); // เก็บตำแหน่งที่เลือก
      }
    }
  }, [postalCode]);

  if (aqiData.length === 0) return <div>Loading...</div>;

  return (
    <MapContainer center={[13.7563, 100.5018]} zoom={6} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {selectedLocation && <ZoomToLocation lat={selectedLocation.lat} lng={selectedLocation.lon} />}
      {aqiData.map((data, index) => (
        <Marker
          key={index}
          position={[data.province.lat, data.province.lon]}
          icon={createCustomMarker(data.aqi?.iaqi.pm25?.v || 'N/A')}
        >
          <Popup>
            <div>
              <h2>{data.province.name}</h2>
              <p>AQI: {data.aqi?.aqi || 'N/A'}</p>
              <p>PM2.5: {data.aqi?.iaqi.pm25?.v || 'N/A'} µg/m³</p>
              <p>สถานะอากาศ: {getStatus(data.aqi?.iaqi.pm25?.v)}</p>
              <p>Last Updated: {data.aqi?.time?.s || 'N/A'}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LocationMap;
