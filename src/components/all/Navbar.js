import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure this is imported
import '../css/Navbar.css';
function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
            <a className="navbar-brand mx-auto" href="/">Zubapop</a>
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
