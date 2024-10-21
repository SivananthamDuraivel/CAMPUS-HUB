import React, { useState, useEffect } from "react";
import "./Landing.css"; 
import logo from "./assets/logo.png"
import rec  from './assets/rec.jpeg'
import shape from './assets/shape.png'
import {Link} from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaBars } from "react-icons/fa";

const Landing = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [menuActive, setMenuActive] = useState(false);

    useEffect(() => {
        // When darkMode is toggled, add/remove the 'dark' or 'light' class to the wrapper
        const bigWrapper = document.querySelector(".big-wrapper");
        if (darkMode) {
            bigWrapper.classList.remove("light");
            bigWrapper.classList.add("dark");
        } else {
            bigWrapper.classList.remove("dark");
            bigWrapper.classList.add("light");
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    const toggleMenu = () => {
        setMenuActive((prevActive) => !prevActive);
    };
    const {user} = useAuthContext();
    const {logout} = useLogout();
    const [nav,setNav]=useState(false);
    const handleClick = ()=>{
      logout();
    }
  
    useEffect(()=>{
      const handleResize=()=>{
        setNav(false);
      }
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    })
  
    return (
        <main>
            <div className={`big-wrapper ${darkMode ? "dark" : "light"} ${menuActive ? "active" : ""}`}>
                <img src="./img/shape.png" alt="" className="shape" />

                <header>
                    <div className="container">
                        <div className="logo">
                            <img src={logo} alt="Logo" />
                            <h3>Campus Hub</h3>
                        </div>

                        <div className="links">
                            <ul>
                                <li><a href="#">Features</a></li>
                                <li><a href="#">Pricing</a></li>
                                <li><a href="#">Testimonials</a></li>
                                {user && (
                                    <li>
                                        <Link onClick={handleClick} className="btn">Logout</Link>
                                    </li>
                                )}
                                {!user && (
                                    <li>
                                        <Link to="/login" className="">Login</Link>
                                    </li>
                                )}
                                {!user && (
                                    <li>
                                        <Link to="/register" className="btn">Register</Link>
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div className="overlay"></div>

                        <div className="hamburger-menu" onClick={toggleMenu}>
                            <div className="bar"></div>
                        </div>
                    </div>
                </header>

                <div className="showcase-area">
                    <div className="container">
                        <div className="left">
                            <div className="big-title">
                                <h1>Future is here,</h1>
                                <h1>Start Exploring now.</h1>
                            </div>
                            <p className="text">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Delectus eius distinctio odit, magni magnam qui ex perferendis vitae!
                            </p>
                            <div className="cta">
                                <a href="#" className="btn">Get started</a>
                            </div>
                        </div>

                        <div className="right">
                            <img src={rec} alt="Person" className="person" />
                        </div>
                    </div>
                </div>

                <div className="bottom-area">
                    <div className="container">
                        <button className="toggle-btn" onClick={toggleDarkMode}>
                            <i className="far fa-moon"></i>
                            <i className="far fa-sun"></i>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Landing;
