import React from 'react';
import '../css/Spinner.css'; // ให้แน่ใจว่ามีการสร้างไฟล์นี้

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
