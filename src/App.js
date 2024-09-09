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


const AppContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // เริ่มโหลด
    const timer = setTimeout(() => {
      setLoading(false); // เสร็จสิ้นการโหลด
    }, 500); // ตั้งค่าเวลาการโหลด 500ms (สามารถปรับได้)

    return () => clearTimeout(timer); // ทำความสะอาด timer เมื่อคอมโพเนนต์ถูกยกเลิก
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/location/:postalCode" element={<LocationPage />} />
          <Route path="/Table" element={<TableComponentPage />} />
          <Route path="/Map" element={<MapComponentPage />} />
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
