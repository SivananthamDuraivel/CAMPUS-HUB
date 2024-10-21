import React, { useState } from "react";
import styles from "./Landing.module.css";  // Import CSS module

import logo from "./assets/logo.png";
import rec from "./assets/rec.jpeg";
import shape from "./assets/shape.png";

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
                className={`${styles["big-wrapper"]} 
                    ${darkMode ? styles.dark : styles.light} 
                    ${menuActive ? styles.active : ""}`}
            >
                <img src={shape} alt="" className={styles.shape} />

                <header>
                    <div className={styles.container}>
                        <div className={styles.logo}>
                            <img src={logo} alt="Logo" />
                            <h3>Campus Hub</h3>
                        </div>

                        <div className={styles.links}>
                            <ul>
                                <li><a href="#">Features</a></li>
                                <li><a href="#">Pricing</a></li>
                                <li><a href="#">Testimonials</a></li>
                                <li><a href="/auth" className={styles.btn}>Sign up</a></li>
                            </ul>
                        </div>

                        <div className={styles.overlay}></div>

                        <div className={styles["hamburger-menu"]} onClick={toggleMenu}>
                            <div className={styles.bar}></div>
                        </div>
                    </div>
                </header>

                <div className={styles["showcase-area"]}>
                    <div className={styles.container}>
                        <div className={styles.left}>
                            <div className={styles["big-title"]}>
                                <h1>Future is here,</h1>
                                <h1>Start Exploring now.</h1>
                            </div>
                            <p className={styles.text}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Delectus eius distinctio odit, magni magnam qui ex perferendis vitae!
                            </p>
                            <div className={styles.cta}>
                                <a href="/auth" className={styles.btn}>Get started</a>
                            </div>
                        </div>

                        <div className={styles.right}>
                            <img src={rec} alt="rec" className={styles.rec} />
                        </div>
                    </div>
                </div>

                <div className={styles["bottom-area"]}>
                    <div className={styles.container}>
                        <button className={styles["toggle-btn"]} onClick={toggleDarkMode}>
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
