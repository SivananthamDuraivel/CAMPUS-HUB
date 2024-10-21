import { useState } from "react"
import { useSignUp } from "../hooks/useSignup";
const Signup = ()=>{
  const {signup,isLoading,error} = useSignUp();
  const [email,setEmail] = useState('');
  const [mobile,setMobile] = useState('');
  const [password,setPassword] = useState('');
  const [cpassword,setCpassword] = useState('');
  const [passError,setPassError] = useState(null);
  const handleClick = async(e)=>{
    e.preventDefault();
    if(password!==cpassword)
    {
      setPassError("Password doesn't match!");
    }
    else
    {
      setPassError(null);
      await signup(email,mobile,password,cpassword);
    }
  }
  return(
    <div className="login-form">
      <form className="Login" onSubmit={handleClick}>
      <h3>Sign Up</h3>
      <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Email"/>
      <input type="text" onChange={(e)=>setMobile(e.target.value)} value={mobile} placeholder="Mobile Number"/>
      <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Password"/>
      <input type="password" onChange={(e)=>setCpassword(e.target.value)} value={cpassword} placeholder="Confirm Password"/>
      <button disabled={isLoading} className="submit-btn">Register</button>
      {(error&&!passError) && <div className="error">{error}</div>}
      {passError && <div className="error">{passError}</div>}
    </form>
    </div>
  )
}

export default Signup;