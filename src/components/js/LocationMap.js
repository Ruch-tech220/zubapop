import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import provinces from '../data/provinces';
import ZoomToLocation from './ZoomToLocation';
import MarkerClusterGroup from 'react-leaflet-markercluster';


const getColor = (pm25) => {
  if (pm25 <= 25) return "rgba(0, 255, 0, 1)"; // สีเขียว
  if (pm25 <= 50) return "rgba(255, 255, 0, 1)"; // สีเหลือง
  if (pm25 <= 100) return "rgba(255, 165, 0, 1)"; // สีส้ม
  if (pm25 <= 200) return "rgba(255, 0, 0, 1)"; // สีแดง
  if (pm25 > 200) return "rgba(128, 0, 128, 1)"; // สีม่วง
  return "rgba(128, 0, 0, 1)"; // สีที่กำหนดสำหรับค่าที่ไม่รู้จัก
};

const LocationMap = ({ lat, lng }) => {
  const [stations, setStations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({ lat: null, lng: null }); // ใช้เก็บตำแหน่งที่เลือก

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.cmuccdc.org/api/ccdc/stations');
        setStations(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMarkerClick = (lat, lng) => {
    setSelectedLocation({ lat, lng }); // ตั้งค่าตำแหน่งที่เลือก
  };

  const groupedStations = stations.reduce((acc, station) => {
    const provinceName = station.dustboy_name_th.split(' ')[0]; // ใช้ชื่อจังหวัด
    if (!acc[provinceName]) {
      acc[provinceName] = [];
    }
    acc[provinceName].push(station);
    return acc;
  }, {});


  return (
    <MapContainer center={[8.4403, 98.5194]} zoom={7} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {stations.map((station) => {
        const pmValue = parseInt(station.dustboy_pv, 10);
        const color = getColor(pmValue);
        const markerIcon = L.divIcon({
          className: 'custom-icon',
          html: `<div style="background-color:${color}; border-radius: 50%; width: 30px; height: 30px; color: white; display: flex; align-items: center; justify-content: center;">${pmValue}</div>`,
        });

        const provinceData = provinces.find(prov => prov.name === station.dustboy_name_th); // หาข้อมูลจังหวัดตามชื่อ

        return (
          <Marker
            key={station.dustboy_id}
            position={[station.dustboy_lat, station.dustboy_lng]}
            icon={markerIcon}
            eventHandlers={{
              click: () => {
                if (provinceData) {
                  handleMarkerClick(provinceData.lat, provinceData.lng); // ตั้งค่าตำแหน่งเมื่อคลิก Marker
                }
              }
            }}
          >
            <Popup>
              {station.dustboy_name_th}<br />PM2.5: {pmValue}
            </Popup>
          </Marker>
        );
      })}
      {selectedLocation.lat && selectedLocation.lng && (
        <ZoomToLocation lat={selectedLocation.lat} lng={selectedLocation.lng} />
      )}        </MapContainer>
  );
};

export default LocationMap;


