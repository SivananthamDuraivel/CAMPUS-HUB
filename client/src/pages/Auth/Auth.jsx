import React, { useState } from "react";
import styles from "./Auth.module.css"; 
import logo from "./assets/log.svg";
import register from "./assets/register.svg";

const Auth = () => {
    const [signUpMode, setSignUpMode] = useState(false);

    const handleSignInClick = () => {
        setSignUpMode(false);
    };

    const handleSignUpClick = () => {
        setSignUpMode(true);
    };

    return (
        <div className={`${styles.container} ${signUpMode ? styles["sign-up-mode"] : ""}`}>
            <div className={styles["forms-container"]}>
                <div className={styles["signin-signup"]}>
                    {/* Sign In Form */}
                    <form action="#" className={styles["sign-in-form"]}>
                        <h2 className={styles.title}>Sign in</h2>
                        <div className={styles["input-field"]}>
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className={styles["input-field"]}>
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
                        </div>
                        <input type="submit" value="Login" className={`${styles.btn} ${styles.solid}`} />
                        <p className={styles["social-text"]}>Or Sign in with social platforms</p>
                        <div className={styles["social-media"]}>
                            <a href="#" className={styles["social-icon"]}>
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className={styles["social-icon"]}>
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className={styles["social-icon"]}>
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="#" className={styles["social-icon"]}>
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </form>

                    {/* Sign Up Form */}
                    <form action="#" className={styles["sign-up-form"]}>
                        <h2 className={styles.title}>Sign up</h2>
                        <div className={styles["input-field"]}>
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className={styles["input-field"]}>
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className={styles["input-field"]}>
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
                        </div>
                        <input type="submit" className={styles.btn} value="Sign up" />
                        <p className={styles["social-text"]}>Or Sign up with social platforms</p>
                        <div className={styles["social-media"]}>
                            <a href="#" className={styles["social-icon"]}>
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className={styles["social-icon"]}>
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className={styles["social-icon"]}>
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="#" className={styles["social-icon"]}>
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            <div className={styles["panels-container"]}>
                {/* Left Panel */}
                <div className={`${styles.panel} ${styles["left-panel"]}`}>
                    <div className={styles.content}>
                        <h3>New here?</h3>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                            ex ratione. Aliquid!
                        </p>
                        <button className={`${styles.btn} ${styles.transparent}`} id="sign-up-btn" onClick={handleSignUpClick}>
                            Sign up
                        </button>
                    </div>
                    <img src={logo} className={styles.image} alt="Sign In" />
                </div>

                {/* Right Panel */}
                <div className={`${styles.panel} ${styles["right-panel"]}`}>
                    <div className={styles.content}>
                        <h3>One of us?</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                            laboriosam ad deleniti.
                        </p>
                        <button className={`${styles.btn} ${styles.transparent}`} id="sign-in-btn" onClick={handleSignInClick}>
                            Sign in
                        </button>
                    </div>
                    <img src={register} className={styles.image} alt="Sign Up" />
                </div>
            </div>
        </div>
    );
};

export default Auth;
