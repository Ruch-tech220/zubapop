import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapComponent from '../js/MapComponent';
import provinces from '../data/provinces';
import TableComponent from '../js/TableComponent';
import '../css/Home.css'

const Home = () => {
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
                        <h1>ยินดีต้อนรับสู่หน้าแรก</h1>
                        <p>คุณสามารถดูข้อมูลคุณภาพอากาศสำหรับจังหวัดต่างๆ ในประเทศไทยได้ที่นี่</p>
                    </header>
                    {/* <div>
                        <h1>Weather Forecast for Thailand</h1>
                        {provinces.map((province, index) => (
                            <WeatherForecast key={index} province={province.name} />
                        ))}
                    </div> */}
                    <main>
                        <MapComponent />
                        <TableComponent provinces={provinces} />
                    </main>
                </div>
            </div>
        </>
    );
}
export default Home;
