import React, { useState, useEffect } from "react";
import styles from "./Landing.module.css";
import logo from "./assets/logo.png";
import rec from "./assets/CampusGridImage.webp";
import shape from "./assets/shape.png";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import Features from "../../components/Features/Features"
const Landing = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    const toggleMenu = () => {
        setMenuActive((prevActive) => !prevActive);
    };

    const { user } = useAuthContext();
    const { logout } = useLogout();

    const handleClick = () => {
        logout();
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 870) {
                setMenuActive(false); // Close menu if screen size is large
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
                            <h3>Campus Grid</h3>
                        </div>

                        <div
                            className={`${styles["landing-links"]} ${
                                menuActive ? styles["active"] : ""
                            }`}
                        >
                            <ul>
                                {user && (
                                    <li>
                                        <Link
                                            onClick={handleClick}
                                            className={styles["landing-btn"]}
                                        >
                                            Logout
                                        </Link>
                                    </li>
                                )}
                                {!user && (
                                    <li>
                                        <Link to="/auth" className={styles["landing-btn"]}>
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div
                            className={`${styles["landing-overlay"]} ${
                                menuActive ? styles["active"] : ""
                            }`}
                            onClick={toggleMenu}
                        ></div>

                        <div
                            className={styles["landing-hamburger-menu"]}
                            onClick={toggleMenu}
                        >
                            <div className={styles["landing-bar"]}></div>
                        </div>
                    </div>
                </header>
                <div className={styles["landing-showcase-area"]}>
                    <div className={styles["landing-container"]}>
                        <div className={styles["landing-left"]}>
                            <div className={styles["landing-big-title"]}>
                                <h2>Uniting Campus,<br/> Simplifying Success</h2>
                            </div>
                            <div className={styles["landing-cta"]}>
                                <a href="/auth" className={styles["landing-btn"]}>
                                    Get started
                                </a>
                            </div>
                        </div>

                        <div className={styles["landing-right"]}>
                            <img
                                src={rec}
                                alt="rec"
                                className={styles["landing-rec"]}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles["landing-bottom-area"]}>
                    <div className={styles["landing-container"]}>
                        <button
                            className={styles["landing-toggle-btn"]}
                            onClick={toggleDarkMode}
                        >
                            <i className="far fa-moon"></i>
                            <i className="far fa-sun"></i>
                        </button>
                    </div>
                </div>
            </div>
            <Features/>
        </main>
    );
};

export default Landing;
