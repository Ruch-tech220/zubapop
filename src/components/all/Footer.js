import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Footer.css'; // นำเข้าฟайл CSS ของคุณ

function Footer() {
    return (
        <>
            <footer className="footer bg-light text-center custom-footer py-4">
                <ul className="social-list list-inline mb-2">
                    <li className="social-item list-inline-item">
                        <a href="https://www.facebook.com/profile.php?id=100088655465543" className="social-link" target="_blank" rel="noopener noreferrer">
                            <span className="fa-stack fa-lg">
                                <i className="fas fa-circle"></i>
                                <i className="fab fa-facebook-f fa-stack-1x fa-inverse "></i>
                            </span>
                        </a>
                    </li>
                </ul>

                <p className="mt-3 mb-0">&copy; {new Date().getFullYear()} YourSite. All rights reserved.</p>
                <p className="mb-0">Contact us: hr@naruthee.com | 0824012345</p>
                <p className="mb-0">28 ซ.ลาดพร้าว 60 แขวงวังทองหลาง เขตวังทองหลาง กรุงเทพ  10310, bangkok, Thailand</p>
            </footer>
        </>
    )
}

export default Footer
