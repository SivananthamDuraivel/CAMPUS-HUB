import {Link} from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
const Navbar = () => {
  const {user} = useAuthContext();
  const {logout} = useLogout();
  const [nav,setNav]=useState(false);
  const handleClick = ()=>{
    logout();
  }

  const handleHamClick = ()=>{
    if (nav===false)
    setNav(true)
    else
    setNav(false)
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
    <> 
      <nav>
        <label className="logo">SparkleRide</label>
        <ul>
          <li><Link to = "/" className="Link">Home</Link></li>
          <li><Link to = "/construction" className="Link">About Us</Link></li>
          <li><Link to = "/construction" className="Link">Services</Link></li>
          <li><Link to = "/construction" className="Link">Contact Us</Link></li>
        </ul>
        <ul>
          {user && (
          <li>
            <button onClick={handleClick} className="Link navbtn">Logout</button>
          </li>
        )}
        {!user && (
          <li>
          <Link to="/login" className="Link navbtn">Login</Link>
          </li>
        )}
        {!user && (
          <li>
          <Link to="/register" className="Link navbtn">Register</Link>
          </li>
        )}
        </ul>
        <FaBars className="hamburger" onClick={handleHamClick}/>
      </nav>
      {
       nav && <div className="mobile-navbar">
       <ul>
           <li onClick={handleHamClick}><Link to = "/" className="Link">Home</Link></li>
           <li onClick={handleHamClick}><Link to = "/construction" className="Link">About Us</Link></li>
           <li onClick={handleHamClick}><Link to = "/construction" className="Link">Services</Link></li>
           <li onClick={handleHamClick}><Link to = "/construction" className="Link">Contact Us</Link></li>
         {user && (
           <li onClick={handleHamClick}>
             <button onClick={handleClick} className="Link navbtn" style={{fontSize: "1.5rem",fontWeight:"bold"}}>Logout</button>
           </li>
         )}
         {!user && (
           <li onClick={handleHamClick}>
           <Link to="/login" className="Link navbtn">Login</Link>
           </li>
         )}
         {!user && (
           <li onClick={handleHamClick}>
           <Link to="/register" className="Link navbtn">Register</Link>
           </li>
         )}
         </ul>
       </div> 
      }
      </>
  );
}
 
export default Navbar;