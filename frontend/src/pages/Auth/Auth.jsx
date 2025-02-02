import React, { useState } from "react";
import styles from "./Auth.module.css";
import logo from "./assets/log.svg";
import register from "./assets/register.svg";
import { useLogin } from "../../hooks/useLogin";
import { useSignUp } from "../../hooks/useSignup";
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate();
    const {signup,isRloading,rerror} = useSignUp();
    const [remail,setRemail] = useState('');
    const [name,setname] = useState('');
    const [rpassword,setRpassword] = useState('');
    const [cpassword,setCpassword] = useState('');
    const [college,setCollege] = useState('');
    const [passError,setPassError] = useState(null);
    const handleRegClick = async(e)=>{
        e.preventDefault();
        if(rpassword!==cpassword)
        {
          setPassError("Password doesn't match!");
        }
        else
        {
          setPassError(null);
          await signup(remail,name,rpassword,cpassword,college);
          navigate('/admin'); 
        }
      }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();
    const handleClick = async (e) => {
        e.preventDefault();
        await login(email, password);
        navigate('/admin'); 
    };
    const [signUpMode, setSignUpMode] = useState(false);
    const handleSignInClick = () => {
        setSignUpMode(false);
    };

    const handleSignUpClick = () => {
        setSignUpMode(true);
    };

    return (
        <div className={`${styles["auth-container"]} ${signUpMode ? styles["auth-sign-up-mode"] : ""}`}>
            <div className={styles["auth-forms-container"]}>
                <div className={styles["auth-signin-signup"]}>
                    {/* Sign In Form */}
                    <form onSubmit={handleClick} className={styles["auth-sign-in-form"]}>
                        <h2 className={styles["auth-title"]}>Sign in</h2>
                        <div className={styles["auth-input-field"]}>
                            <i className="fas fa-user"></i>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
                        </div>
                        <div className={styles["auth-input-field"]}>
                            <i className="fas fa-lock"></i>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
                        </div>
                        {error && <div>{error}</div>}
                        <input type="submit" value="Login" className={`${styles["auth-btn"]} ${styles["auth-solid"]}`} />
                        {/* <p className={styles["auth-social-text"]}>Or Sign in with social platforms</p>
                        <div className={styles["auth-social-media"]}>
                            <a href="#" className={styles["auth-social-icon"]}>
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className={styles["auth-social-icon"]}>
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className={styles["auth-social-icon"]}>
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="#" className={styles["auth-social-icon"]}>
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div> */}
                    </form>

                    {/* Sign Up Form */}
                    <form onSubmit={handleRegClick} className={styles["auth-sign-up-form"]}>
                        <h2 className={styles["auth-title"]}>Sign up</h2>
                        <div className={styles["auth-input-field"]}>
                            <i className="fas fa-envelope"></i>
                            <input type="email" onChange={(e)=>setRemail(e.target.value)} value={remail} placeholder="Email" required/>
                        </div>
                        <div className={styles["auth-input-field"]}>
                            <i className="fas fa-user"></i>
                            <input type="text" onChange={(e)=>setname(e.target.value)} value={name} placeholder="Name" required/>
                        </div>
                        <div className={styles["auth-input-field"]}>
                            <i className="fas fa-user"></i>
                            <input type="text" onChange={(e)=>setCollege(e.target.value)} value={college} placeholder="College Name" required/>
                        </div>
                        <div className={styles["auth-input-field"]}>
                            <i className="fas fa-lock"></i>
                            <input type="password" onChange={(e)=>setRpassword(e.target.value)} value={rpassword} placeholder="Password" required/>
                        </div>
                        <div className={styles["auth-input-field"]}>
                            <i className="fas fa-lock"></i>
                            <input type="password" onChange={(e)=>setCpassword(e.target.value)} value={cpassword} placeholder="Confirm Password" required/>
                        </div>
                        {(rerror&&!passError) && <div className="error">{rerror}</div>}
                        {passError && <div className="error">{passError}</div>}
                        <input type="submit" className={styles["auth-btn"]} value="Sign up" />
                    </form>
                </div>
            </div>

            <div className={styles["auth-panels-container"]}>
                {/* Left Panel */}
                <div className={`${styles["auth-panel"]} ${styles["auth-left-panel"]}`}>
                    <div className={styles["auth-content"]}>
                        <h3>New here?</h3>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                            ex ratione. Aliquid!
                        </p>
                        <button className={`${styles["auth-btn"]} ${styles["auth-transparent"]}`} id="auth-sign-up-btn" onClick={handleSignUpClick}>
                            Sign up
                        </button>
                    </div>
                    <img src={logo} className={styles["auth-image"]} alt="Sign In" />
                </div>

                {/* Right Panel */}
                <div className={`${styles["auth-panel"]} ${styles["auth-right-panel"]}`}>
                    <div className={styles["auth-content"]}>
                        <h3>One of us?</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                            laboriosam ad deleniti.
                        </p>
                        <button disabled={isLoading} className={`${styles["auth-btn"]} ${styles["auth-transparent"]}`} id="auth-sign-in-btn" onClick={handleSignInClick}>
                            Sign in
                        </button>
                    </div>
                    <img src={register} className={styles["auth-image"]} alt="Sign Up" />
                </div>
            </div>
        </div>
    );
};

export default Auth;
