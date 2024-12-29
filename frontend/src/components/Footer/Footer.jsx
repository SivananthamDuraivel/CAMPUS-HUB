import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import footerStyles from "./Footer.module.css";
import { Link } from "react-router-dom";
import logo from "../../pages/Landing/assets/logo.png";

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.container}>
        <div className={footerStyles.logoContainer}>
          <div className={footerStyles.name}>
            <img src={logo} alt="Logo" className={footerStyles.logo} />
            <h1>Campus Grid</h1>
          </div>
          <p>Uniting Campus, Simplifying Success</p>
        </div>
        <div className={footerStyles.quickLinks}>
          <h2>Quick Links</h2>
          <ul>
            <li><Link className={footerStyles.link} to="/">Home</Link></li>
            <li><Link className={footerStyles.link} to = "/createEvent">Events</Link></li>
            <li><Link className={footerStyles.link} to = "/examHallPlanner">Exam Planner</Link></li>
            <li><Link className={footerStyles.link}>Calendar</Link></li>
          </ul>
        </div>
        <div className={footerStyles.contact}>
          <h2>Contact</h2>
          <ul>
            <li>
              <a href="mailto:CampusGrid@gmail.com"><FaEnvelope className={footerStyles.icon} /><span>CampusGrid@gmail.com</span></a>
            </li>
            <li>
              <a href="tel:+919876543210"><FaPhoneAlt className={footerStyles.icon} /><span>9876543210</span></a>
            </li>
          </ul>
        </div>
      </div>
      <div className={footerStyles.bottom}>
        <p>© 2024 Campus Grid. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
