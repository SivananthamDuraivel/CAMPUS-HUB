import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import car from "../assets/logincarimg.jpg"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useLogin();

  const handleClick = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login-form">
      <form className="Login" onSubmit={handleClick}>
        <h3>LOGIN</h3>
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
        <button disabled={isLoading} className="submit-btn">Login</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
