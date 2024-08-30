import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/About.css'

const About = () => {
    return (
        <>
            <header className="masthead">
                <div className="container-fluid px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="site-heading" style={{ textAlign: 'center' }}>
                                <h1>About</h1>
                                <span className="subheading" style={{ display: 'block', marginTop: '0.5rem' }}>A Blog Theme by Start Bootstrap</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main className="main">
                <div className="container2 px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7 text-center">
                            <div className="about-content">
                                <img src="assets/image/avataaars.svg" alt="Profile" className="profile-img" />
                                <h2 className="name">John Doe</h2>
                                <p className="position">Web Developer</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe nostrum ullam eveniet pariatur voluptates odit, fuga atque ea nobis sit soluta odio, adipisci quas excepturi maxime quae totam ducimus consectetur?</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius praesentium recusandae illo eaque architecto error, repellendus iusto reprehenderit, doloribus, minus sunt. Numquam at quae voluptatum in officia voluptas voluptatibus, minus!</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consequuntur magnam, excepturi aliquid ex itaque esse est vero natus quae optio aperiam soluta voluptatibus corporis atque iste neque sit tempora!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
};

export default About;
