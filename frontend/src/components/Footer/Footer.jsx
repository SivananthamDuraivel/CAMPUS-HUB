import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import footerStyles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.bottom}>
        <p>© 2024 Campus Grid. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
