import React from 'react';
import '../css/Contact.css'; // สไตล์ CSS ของคุณ

const Contact = () => {
    return (
        <>
            {/* Page Header */}
            <header className="masthead">
                <div className="container-fluid px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="site-heading" style={{ textAlign: 'center' }}>
                                <h1>Contact</h1>
                                <span className="subheading" style={{ display: 'block', marginTop: '0.5rem' }}>A Blog Theme by Start Bootstrap</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mb-4">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <p>Want to get in touch? Fill out the form below to send me a message and I will get back to you as soon as possible!</p>
                            <div className="my-5">
                                {/* Contact Info Container */}
                                <div className="container">
                                    <div className="info-container">
                                        <div className="row">
                                            <div className="col-md-4 mb-4">
                                                <div className="info-box">
                                                    <h3>Email</h3>
                                                    <p>example@example.com</p>
                                                </div>
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <div className="info-box">
                                                    <h3>Telephone</h3>
                                                    <p>(+66) 123-456-789</p>
                                                </div>
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <div className="info-box">
                                                    <h3>Address</h3>
                                                    <p>1234 Main Street,<br />Bangkok, Thailand</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-5">
                                <h2>Find Us Here</h2>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.118826916368!2d100.5946108!3d13.793506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29dbeafbfb5dd%3A0x3d2a9faef9257472!2z4LmA4Lit4LiH4Li44LiX4LiH4Liy4Li04Lit4Lii4Li04Lix!5e0!3m2!1sen!2sth!4v1692540534383!5m2!1sen!2sth"
                                    width="100%"
                                    height="400"
                                    frameBorder="0"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    aria-hidden="false"
                                    tabIndex="0"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Contact;
