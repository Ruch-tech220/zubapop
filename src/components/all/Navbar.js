import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Navbar.css';
import logo from '../../logo.png'; // ปรับเส้นทางให้ถูกต้องตามตำแหน่งที่ไฟล์โลโก้ของคุณอยู่

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
            <Link className="navbar-brand mx-auto" to="/">
                <img src={logo} alt="Zubapop Logo" style={{ height: '70px' }} /> {/* ปรับขนาดโลโก้ได้ตามที่ต้องการ */}
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {/* <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">หน้าเเรก</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">เกี่ยวกับเรา</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contact">ติดต่อ</Link>
                    </li>
                </ul>
            </div> */}
            
        </nav>
    );
}

export default Navbar;
