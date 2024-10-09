// import React, { useEffect, useRef, useState } from "react";
// import L from "leaflet";
// import { useNavigate } from "react-router-dom";
// import "leaflet/dist/leaflet.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import provinces from "../data/provinces";
// import '../css/MapComponent.css';
// import "leaflet.fullscreen/Control.FullScreen.css";
// import "leaflet.fullscreen";

// const API_KEY = "47de584d708e209aa1803379fa530fe9221def58";

// const MapComponent = () => {
//     const mapRef = useRef(null);
//     const [infoContent, setInfoContent] = useState(null); // เปลี่ยนจาก string เป็น null หรือ React element
//     const navigate = useNavigate();


//     useEffect(() => {
//         if (!mapRef.current) {
//             mapRef.current = L.map("map", {
//                 zoomControl: false,
//                 fullscreenControl: true,
//                 fullscreenControlOptions: {
//                     position: "topleft",
//                 },
//             }).setView([13.7563, 100.5018], 6);

//             L.control.zoom({ position: "bottomright" }).addTo(mapRef.current);

//             const osmLayer = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//                 attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//             });
//             mapRef.current.addLayer(osmLayer);

//             fetchAllProvincesData(mapRef.current);
//         }
//     }, [fetchAllProvincesData]);

//     function createCustomIcon(pm25) {
//         return L.divIcon({
//             className: "custom-icon",
//             html: `
//                 <div class="d-flex justify-content-center align-items-center" style="background-color:${getColor(pm25)}; width: 30px; height: 30px; border-radius: 50%; border: 2px solid black; font-size: 10px; color: black;">
//                     ${pm25}
//                 </div>
//             `,
//             iconSize: [40, 40],
//             iconAnchor: [20, 20]
//         });
//     }

//     function getColor(pm25) {
//         if (pm25 <= 25) return "rgba(0, 255, 0, 1)";
//         if (pm25 <= 50) return "rgba(255, 255, 0, 1)";
//         if (pm25 <= 100) return "rgba(255, 165, 0, 1)";
//         if (pm25 <= 200) return "rgba(255, 0, 0, 1)";
//         if (pm25 > 200) return "rgba(128, 0, 128, 1)";
//         return "rgba(128, 0, 0, 1)";
//     }

//     function getStatus(pm25) {
//         if (pm25 <= 25) return "อากาศกำลังดี";
//         if (pm25 <= 50) return "อากาศดี";
//         if (pm25 <= 100) return "อากาศพอใช้";
//         if (pm25 <= 200) return "อากาศแย่";
//         if (pm25 > 200) return "อากาศอันตราย";
//         return "ไม่ทราบ";
//     }

//     async function fetchProvincePM25Data(province) {
//         try {
//             const response = await fetch(`https://api.waqi.info/feed/geo:${province.lat};${province.lon}/?token=${API_KEY}`);
//             const data = await response.json();

//             if (data.status === "ok") {
//                 const iaqi = data.data.iaqi;
//                 const pm25 = iaqi.pm25 ? iaqi.pm25.v : "N/A";
//                 const pm10 = iaqi.pm10 ? iaqi.pm10.v : "N/A";
//                 const t = iaqi.t ? iaqi.t.v : "N/A";
//                 const h = iaqi.h ? iaqi.h.v : "N/A";
//                 const w = iaqi.w ? iaqi.w.v : "N/A";
//                 const co = iaqi.co ? iaqi.co.v : "N/A";
//                 const no2 = iaqi.no2 ? iaqi.no2.v : "N/A";
//                 const o3 = iaqi.o3 ? iaqi.o3.v : "N/A";
//                 const so2 = iaqi.so2 ? iaqi.so2.v : "N/A";
//                 const p = iaqi.p ? iaqi.p.v : "N/A";
//                 const r = iaqi.r ? iaqi.r.v : "N/A";
//                 const currentTime = new Date(data.data.time.iso).toLocaleString("th-TH", {
//                     weekday: "long",
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                     hour: "2-digit",
//                     minute: "2-digit",
//                     second: "2-digit",
//                 });

//                 const color = getColor(pm25);
//                 const status = getStatus(pm25);

//                 const marker = L.marker([province.lat, province.lon], {
//                     icon: createCustomIcon(pm25),
//                 });

//                 // Add tooltip instead of popup
//                 marker.bindTooltip(`
//                     <div class="tooltip-content">
//                         <h2 class="tooltip-header">จังหวัด ${province.name}</h2>
//                         <div class="tooltip-status" style="background-color:${color}; color: black; border: 1px solid black; padding: 10px;">
//                             <h3>${pm25} ${status}</h3>
//                             <p class="tooltip-updated">${currentTime}</p>
//                         </div>
//                         <div class="tooltip-details">
//                             <p>ค่า PM2.5: ${pm25}μg/m³</p>
//                             <p>ค่า PM10: ${pm10}μg/m³</p>
//                             <p>อุณหภูมิ: ${t} °C</p>
//                             <p>ความชื้น: ${h} %</p>
//                             <p>ความเร็วลม: ${w} m/s</p>
//                             <p>ค่า CO: ${co} μg/m³</p>
//                             <p>ค่า NO<sub>2</sub>: ${no2} μg/m³</p>
//                             <p>ค่า O<sub>3</sub>: ${o3} μg/m³</p>
//                             <p>ค่า SO<sub>2</sub>: ${so2} μg/m³</p>
//                             <p>ความกดอากาศ: ${p} hPa</p>
//                             <p>ปริมาณน้ำฝน: ${r} mm</p>
//                         </div>
//                     </div>
//                 `, { sticky: true });

//                 marker.on("click", function () {
//                     setInfoContent(
//                         <div className="container info-content-container">
//                             <h2 className="info-header">สถานที่คือ: จังหวัด {province.name}</h2>
//                             <div className="info-status" style={{ backgroundColor: color }}>
//                                 <h4 className="info-heading">{pm25} {status}</h4>
//                             </div>
//                             <h3 className="mb-3">รายละเอียด:</h3>
//                             <div className="container" style={{ padding: '15px', border: '2px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9', marginTop: '20px' }}>
//                                 <ul>
//                                     <li className="list-group-item">ค่า PM2.5: {pm25} μg/m³</li>
//                                     <li className="list-group-item">ค่า PM10: {pm10} μg/m³</li>
//                                     <li className="list-group-item">อุณหภูมิ: {t} °C</li>
//                                     <li className="list-group-item">ความชื้น: {h} %</li>
//                                     <li className="list-group-item">ความเร็วลม: {w} m/s</li>
//                                     <li className="list-group-item">ค่า CO: {co} μg/m³</li>
//                                     <li className="list-group-item">ค่า NO<sub>2</sub>: {no2} μg/m³</li>
//                                     <li className="list-group-item">ค่า O<sub>3</sub>: {o3} μg/m³</li>
//                                     <li className="list-group-item">ค่า SO<sub>2</sub>: {so2} μg/m³</li>
//                                     <li className="list-group-item">ความกดอากาศ: {p} hPa</li>
//                                     <li className="list-group-item">ปริมาณน้ำฝน: {r} mm</li>
//                                     <li className="list-group-item">อัปเดตล่าสุด: {currentTime}</li>
//                                 </ul>
//                             </div>
//                             <button
//                                 className="btn btn-primary info-button"
//                                 onClick={() => navigate(`/location/${province.postalCode}`)}
//                             >
//                                 ดูรายละเอียดเพิ่มเติม
//                             </button>
//                         </div>
//                     );
//                 });
//                 return marker;
//             } else {
//                 console.error(`Error fetching data for ${province.name}:`, data.status);
//                 return null;
//             }
//         } catch (error) {
//             console.error(`Error fetching data for ${province.name}:`, error);
//             return null;
//         }
//     }

//     function fetchAllProvincesData(map) {
//         provinces.forEach(async (province) => {
//             const marker = await fetchProvincePM25Data(province);
//             if (marker) map.addLayer(marker);
//         });
//     }

//     const [weatherData, setWeatherData] = useState([]);

//     useEffect(() => {
//         const fetchWeatherData = async () => {
//             try {
//                 const response = await fetch('/get_weather_data.php'); 
//                 const data = await response.json();
//                 setWeatherData(data);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         fetchWeatherData();
//     }, []);

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       try {
//         const response = await fetch('/api/weather');
//         const data = await response.json();
//         setWeatherData(data);
//       } catch (err) {
//         console.error('Error fetching weather data:', err);
//       }
//     };

//     fetchWeatherData();
//   }, []);

//     return (
//         <div className="MapCom">
//             <div className="row">
//                 <table className="tableAQI">
//                     <thead>
//                         <tr className="headeraqi">
//                             <th>PM<sub>2.5</sub>(μg/m<sup>3</sup>)(ไมโครกรัมต่อลูกบาศก์เมตร)</th>
//                             <td className="pm25-range-1">0-25</td>
//                             <td className="pm25-range-2">26-50</td>
//                             <td className="pm25-range-3">51-100</td>
//                             <td className="pm25-range-4">101-200</td>
//                             <td className="pm25-range-5">&gt;200</td>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {/* เพิ่มข้อมูลที่ต้องการแสดงในตาราง */}
//                     </tbody>
//                 </table>
//                 <div className="col-md-6">
//                     <div id="map" style={{ height: "600px" }}></div> {/* กำหนดความสูงของแผนที่ */}
//                 </div>
//                 <div className="col-md-6">
//                     <div id="info-content">
//                         {infoContent}
//                     </div>
//                     {/* ตารางข้อมูลที่มีการแสดงค่า PM2.5 */}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MapComponent;


import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import provinces from "../data/provinces";
import '../css/MapComponent.css';
import "leaflet.fullscreen/Control.FullScreen.css";
import "leaflet.fullscreen";

const API_KEY = "47de584d708e209aa1803379fa530fe9221def58";

const MapComponent = () => {
    const mapRef = useRef(null);
    const [infoContent, setInfoContent] = useState(null); // เปลี่ยนจาก string เป็น null หรือ React element
    const navigate = useNavigate();


    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map("map", {
                zoomControl: false,
                fullscreenControl: true,
                fullscreenControlOptions: {
                    position: "topleft",
                },
            }).setView([13.7563, 100.5018], 6);

            L.control.zoom({ position: "bottomright" }).addTo(mapRef.current);

            const osmLayer = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            });
            mapRef.current.addLayer(osmLayer);

            fetchAllProvincesData(mapRef.current);
        }
    }, [fetchAllProvincesData]);

    function createCustomIcon(pm25) {
        return L.divIcon({
            className: "custom-icon",
            html: `
                <div class="d-flex justify-content-center align-items-center" style="background-color:${getColor(pm25)}; width: 30px; height: 30px; border-radius: 50%; border: 2px solid black; font-size: 10px; color: black;">
                    ${pm25}
                </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });
    }

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

    async function fetchProvincePM25Data(province) {
        try {
            const response = await fetch(`https://api.waqi.info/feed/geo:${province.lat};${province.lon}/?token=${API_KEY}`);
            const data = await response.json();

            if (data.status === "ok") {
                const iaqi = data.data.iaqi;
                const pm25 = iaqi.pm25 ? iaqi.pm25.v : "N/A";
                const pm10 = iaqi.pm10 ? iaqi.pm10.v : "N/A";
                const t = iaqi.t ? iaqi.t.v : "N/A";
                const h = iaqi.h ? iaqi.h.v : "N/A";
                const w = iaqi.w ? iaqi.w.v : "N/A";
                const co = iaqi.co ? iaqi.co.v : "N/A";
                const no2 = iaqi.no2 ? iaqi.no2.v : "N/A";
                const o3 = iaqi.o3 ? iaqi.o3.v : "N/A";
                const so2 = iaqi.so2 ? iaqi.so2.v : "N/A";
                const p = iaqi.p ? iaqi.p.v : "N/A";
                const r = iaqi.r ? iaqi.r.v : "N/A";
                const currentTime = new Date(data.data.time.iso).toLocaleString("th-TH", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                });
                
                await fetch('/save_pm25_data.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        province_name: province.name,
                        pm25: pm25,
                        pm10: pm10,
                        temperature: t,
                        humidity: h,
                        wind_speed: w,
                        co: co,
                        no2: no2,
                        o3: o3,
                        so2: so2,
                        pressure: p,
                        rainfall: r,
                        updated_at: currentTime,
                    }),
                });
                

                const color = getColor(pm25);
                const status = getStatus(pm25);

                const marker = L.marker([province.lat, province.lon], {
                    icon: createCustomIcon(pm25),
                });

                // Add tooltip instead of popup
                marker.bindTooltip(`
                    <div class="tooltip-content">
                        <h2 class="tooltip-header">จังหวัด ${province.name}</h2>
                        <div class="tooltip-status" style="background-color:${color}; color: black; border: 1px solid black; padding: 10px;">
                            <h3>${pm25} ${status}</h3>
                            <p class="tooltip-updated">${currentTime}</p>
                        </div>
                        <div class="tooltip-details">
                            <p>ค่า PM2.5: ${pm25}μg/m³</p>
                            <p>ค่า PM10: ${pm10}μg/m³</p>
                            <p>อุณหภูมิ: ${t} °C</p>
                            <p>ความชื้น: ${h} %</p>
                            <p>ความเร็วลม: ${w} m/s</p>
                            <p>ค่า CO: ${co} μg/m³</p>
                            <p>ค่า NO<sub>2</sub>: ${no2} μg/m³</p>
                            <p>ค่า O<sub>3</sub>: ${o3} μg/m³</p>
                            <p>ค่า SO<sub>2</sub>: ${so2} μg/m³</p>
                            <p>ความกดอากาศ: ${p} hPa</p>
                            <p>ปริมาณน้ำฝน: ${r} mm</p>
                        </div>
                    </div>
                `, { sticky: true });

                marker.on("click", function () {
                    setInfoContent(
                        <div className="container info-content-container">
                            <h2 className="info-header">สถานที่คือ: จังหวัด {province.name}</h2>
                            <div className="info-status" style={{ backgroundColor: color }}>
                                <h4 className="info-heading">{pm25} {status}</h4>
                            </div>
                            <h3 className="mb-3">รายละเอียด:</h3>
                            <div className="container" style={{ padding: '15px', border: '2px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9', marginTop: '20px' }}>
                                <ul>
                                    <li className="list-group-item">ค่า PM2.5: {pm25} μg/m³</li>
                                    <li className="list-group-item">ค่า PM10: {pm10} μg/m³</li>
                                    <li className="list-group-item">อุณหภูมิ: {t} °C</li>
                                    <li className="list-group-item">ความชื้น: {h} %</li>
                                    <li className="list-group-item">ความเร็วลม: {w} m/s</li>
                                    <li className="list-group-item">ค่า CO: {co} μg/m³</li>
                                    <li className="list-group-item">ค่า NO<sub>2</sub>: {no2} μg/m³</li>
                                    <li className="list-group-item">ค่า O<sub>3</sub>: {o3} μg/m³</li>
                                    <li className="list-group-item">ค่า SO<sub>2</sub>: {so2} μg/m³</li>
                                    <li className="list-group-item">ความกดอากาศ: {p} hPa</li>
                                    <li className="list-group-item">ปริมาณน้ำฝน: {r} mm</li>
                                    <li className="list-group-item">อัปเดตล่าสุด: {currentTime}</li>
                                </ul>
                            </div>
                            <button
                                className="btn btn-primary info-button"
                                onClick={() => navigate(`/location/${province.postalCode}`)}
                            >
                                ดูรายละเอียดเพิ่มเติม
                            </button>
                        </div>
                    );
                });
                return marker;
            } else {
                console.error(`Error fetching data for ${province.name}:`, data.status);
                return null;
            }
        } catch (error) {
            console.error(`Error fetching data for ${province.name}:`, error);
            return null;
        }
    }

    function fetchAllProvincesData(map) {
        provinces.forEach(async (province) => {
            const marker = await fetchProvincePM25Data(province);
            if (marker) map.addLayer(marker);
        });
    }

    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch('/get_weather_data.php'); 
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchWeatherData();
    }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('/api/weather');
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        console.error('Error fetching weather data:', err);
      }
    };

    fetchWeatherData();
  }, []);

    return (
        <div className="MapCom">
            <div className="row">
                <table className="tableAQI">
                    <thead>
                        <tr className="headeraqi">
                            <th>PM<sub>2.5</sub>(μg/m<sup>3</sup>)(ไมโครกรัมต่อลูกบาศก์เมตร)</th>
                            <td className="pm25-range-1">0-25</td>
                            <td className="pm25-range-2">26-50</td>
                            <td className="pm25-range-3">51-100</td>
                            <td className="pm25-range-4">101-200</td>
                            <td className="pm25-range-5">&gt;200</td>
                        </tr>
                    </thead>
                    <tbody>
                        {/* เพิ่มข้อมูลที่ต้องการแสดงในตาราง */}
                    </tbody>
                </table>
                <div className="col-md-6">
                    <div id="map" style={{ height: "600px" }}></div> {/* กำหนดความสูงของแผนที่ */}
                </div>
                <div className="col-md-6">
                    <div id="info-content">
                        {infoContent}
                    </div>
                    {/* ตารางข้อมูลที่มีการแสดงค่า PM2.5 */}
                </div>
            </div>
        </div>
    );
};

export default MapComponent;


