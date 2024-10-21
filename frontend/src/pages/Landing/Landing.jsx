import React, { useState, useEffect } from "react";
import styles from "./Landing.module.css";
import logo from "./assets/logo.png";
import rec from "./assets/rec.jpeg";
import shape from "./assets/shape.png";
import {Link} from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaBars } from "react-icons/fa";

const Landing = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [menuActive, setMenuActive] = useState(false);

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
            <div
                className={`${styles["landing-big-wrapper"]} 
                    ${darkMode ? styles["landing-dark"] : styles["landing-light"]} 
                    ${menuActive ? styles["landing-active"] : ""}`}
            >
                <img src={shape} alt="" className={styles["landing-shape"]} />

                <header>
                    <div className={styles["landing-container"]}>
                        <div className={styles["landing-logo"]}>
                            <img src={logo} alt="Logo" />
                            <h3>Campus Hub</h3>
                        </div>

                        <div className={styles["landing-links"]}>
                            <ul>
                                <li><a href="#">Features</a></li>
                                <li><a href="#">Pricing</a></li>
                                <li><a href="#">Testimonials</a></li>
                                                                {user && (
                                    <li>
                                        <Link onClick={handleClick} className={styles["landing-btn"]}>Logout</Link>
                                    </li>
                                )}
                                {!user && (
                                    <li>
                                        <Link to="/login" className="">Login</Link>
                                    </li>
                                )}
                                {!user && (
                                    <li>
                                        <Link to="/auth" className={styles["landing-btn"]}>Register</Link>
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div className={styles["landing-overlay"]}></div>

                        <div className={styles["landing-hamburger-menu"]} onClick={toggleMenu}>
                            <div className={styles["landing-bar"]}></div>
                        </div>
                    </div>
                </header>

                <div className={styles["landing-showcase-area"]}>
                    <div className={styles["landing-container"]}>
                        <div className={styles["landing-left"]}>
                            <div className={styles["landing-big-title"]}>
                                <h1>Future is here,</h1>
                                <h1>Start Exploring now.</h1>
                            </div>
                            <p className={styles["landing-text"]}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Delectus eius distinctio odit, magni magnam qui ex perferendis vitae!
                            </p>
                            <div className={styles["landing-cta"]}>
                                <a href="/auth" className={styles["landing-btn"]}>Get started</a>
                            </div>
                        </div>

                        <div className={styles["landing-right"]}>
                            <img src={rec} alt="rec" className={styles["landing-rec"]} />
                        </div>
                    </div>
                </div>

                <div className={styles["landing-bottom-area"]}>
                    <div className={styles["landing-container"]}>
                        <button className={styles["landing-toggle-btn"]} onClick={toggleDarkMode}>
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