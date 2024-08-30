import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapComponent from '../js/MapComponent';
import provinces from '../data/provinces';
import TableComponent from '../js/TableComponent';
import '../css/Home.css'
import WeatherForecast from '../js/WeatherForecast';

const TableComponentPage = () => {
    return (
        <>
            {/* Page Header */}
            <header className="masthead">
                <div className="container-fluid px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="site-heading" style={{ textAlign: 'center' }}>
                                <h1>Zubapop</h1>
                                <span className="subheading" style={{ display: 'block', marginTop: '0.5rem' }}>
                                    เว็บไซต์สำหรับวัดสภาพอากาศเเละฝุ่น Pm2.5 ในประเทศไทย
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}

            <div className="main-content">
                <div className="container1">
                    <header className="home-header">
                        <h1>Welcome to the Home Page</h1>
                        <p>Here you can find the air quality information for provinces in Thailand.</p>
                    </header>
                    <main>
                        <TableComponent provinces={provinces} />
                    </main>
                </div>
            </div>
        </>
    );
}
export default TableComponentPage;
