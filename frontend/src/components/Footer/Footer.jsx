import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import footerStyles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      {/* <div className={footerStyles.container}>
        <div className={footerStyles.mainSection}>
          <div className={footerStyles.logoSection}>
            <h2>Campus Grid</h2>
          </div>

          <div className={footerStyles.contactSection}>
            <h3>Contact Us</h3>
            <p>Email: support@campusgrid.com</p>
            <p>Phone: +91 93605 77908</p>
            <p>Address: Chennai, Tamil Nadu, India</p>
          </div>
        </div>

        <div className={footerStyles.linksSection}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/events">Events</a></li>
            <li><a href="/timetable">Timetable</a></li>
            <li><a href="/collaboration">Collaboration</a></li>
            <li><a href="/careers">Careers</a></li>
          </ul>
        </div>
        <div>
                <div className={footerStyles.socialSection}>
          <h3>Follow Us</h3>
          <div className={footerStyles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      </div> */}

      <div className={footerStyles.bottom}>
        <p>© 2024 Campus Grid. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
