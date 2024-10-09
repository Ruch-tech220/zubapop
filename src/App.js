// // src/App.js
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import Footer from './components/all/Footer';
// import Navbar from './components/all/Navbar';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Home from './components/pages/Home';
// import LocationPage from './components/pages/LocationPage';
// import About from './components/pages/About';
// import Contact from './components/pages/Contact';
// import Spinner from './components/js/Spinner';
// import './App.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import TableComponentPage from './components/pages/TableComponentPage';
// import MapComponentPage from './components/pages/MapComponentPage';


// const AppContent = () => {
//   const location = useLocation();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true); // เริ่มโหลด
//     const timer = setTimeout(() => {
//       setLoading(false); // เสร็จสิ้นการโหลด
//     }, 500); // ตั้งค่าเวลาการโหลด 500ms (สามารถปรับได้)

//     return () => clearTimeout(timer); // ทำความสะอาด timer เมื่อคอมโพเนนต์ถูกยกเลิก
//   }, [location.pathname]);

//   return (
//     <>
//       <Navbar />
//       {loading ? (
//         <Spinner />
//       ) : (
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/location/:postalCode" element={<LocationPage />} />
//           <Route path="/Table" element={<TableComponentPage />} />
//           <Route path="/Map" element={<MapComponentPage />} />
//         </Routes>
//       )}
//       <Footer />
//     </>
//   );
// };

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// export default App;

// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/all/Footer';
import Navbar from './components/all/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/pages/Home';
import LocationPage from './components/pages/LocationPage';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Spinner from './components/js/Spinner';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import TableComponentPage from './components/pages/TableComponentPage';
import MapComponentPage from './components/pages/MapComponentPage';
import axios from 'axios';

const AppContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [aqiData, setAqiData] = useState([]); // สร้าง state เพื่อเก็บข้อมูล AQI

  useEffect(() => {
    setLoading(true); // เริ่มโหลด
    const timer = setTimeout(() => {
      setLoading(false); // เสร็จสิ้นการโหลด
    }, 500); // ตั้งค่าเวลาการโหลด 500ms (สามารถปรับได้)

    return () => clearTimeout(timer); // ทำความสะอาด timer เมื่อคอมโพเนนต์ถูกยกเลิก
  }, [location.pathname]);

  useEffect(() => {
    const fetchAqiDataFromBackend = async () => {
      try {
        const response = await axios.get('http://localhost:3001/aqi'); // ดึงข้อมูลจาก backend
        setAqiData(response.data); // เก็บข้อมูล AQI ที่ดึงได้ใน state
      } catch (error) {
        console.error('Error fetching AQI data:', error);
      }
    };
    fetchAqiDataFromBackend();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route path="/" element={<Home aqiData={aqiData} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/location/:postalCode" element={<LocationPage aqiData={aqiData} />} />
          <Route path="/Table" element={<TableComponentPage aqiData={aqiData} />} />
          <Route path="/Map" element={<MapComponentPage aqiData={aqiData} />} />
        </Routes>
      )}
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
