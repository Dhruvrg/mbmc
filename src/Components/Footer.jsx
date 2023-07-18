import React from "react";

// Images
import "./Footer.css";
import { FaLinkedin, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col">
              <h4>About</h4>
              <ul>
                <li>
                  <a href="#">about us</a>
                </li>
                <li>
                  <a href="#">our services</a>
                </li>
                <li>
                  <a href="#">privacy policy</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Get Help</h4>
              <ul>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Payments</a>
                </li>
                <li>
                  <a href="#">Courses</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact us</h4>
              <ul>
                <li>
                  <a href="mailto:horrorj18@gmail.com?body=fell free to type">
                    Gmail
                  </a>
                </li>
                <li>
                  <a href="tel:9999999999">Helpline No</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>follow us</h4>
              <div className="social-links">
                <a
                  href="https://www.linkedin.com/in/darshan-jaju-73b237223/"
                  target="blank"
                >
                  <FaFacebook className=" mx-auto mt-3 scale-125" />
                </a>
                <a href="https://twitter.com/Darshanjaju5" target="blank">
                  <FaTwitter className=" mx-auto mt-3 scale-125" />
                </a>

                <a href="https://www.instagram.com/dj__260/" target="blank">
                  <FaInstagram className=" mx-auto mt-3 scale-125" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 flex flex-col sm:flex-row justify-center items-center gap-4 ">
        <p className="text-white text-2xl my-2  ">© 2023</p>
        <div className=" ">
        <img  src="https://majhivasundhara.in//assets/images/header_logo.png" alt="logo" width={75}/>
        </div>
      </div>
      
      </footer>
    </div>
  );
};

export default Footer;
