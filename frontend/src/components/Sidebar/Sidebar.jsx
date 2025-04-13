import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { useAuthContext } from "../../hooks/useAuthContext";
import { IconContext } from 'react-icons';
import { useLogout } from "../../hooks/useLogout";
import './Sidebar.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import shape from "../../pages/Landing/assets/logo.png";
import {useNavigate} from "react-router-dom"
function Navbar() {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const {user} = useAuthContext();
  const role = user.role;
  console.log(role)
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const items = SidebarData[role] || [];

  const handleClick = () => {
    console.log("Hello");
    logout();
  };

  return (
    <>
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className='navbar'>
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <div className="">
          <div className="logo" onClick={()=>navigate("/")}>
            <img src={shape} alt="" className="logo-icon"/>
            <p className="app-name">
              Campus Grid
            </p>
          </div>
        </div>
      </div>

      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='navbar-toggle'>
            <Link to='#' className='menu-bars'>
              <AiIcons.AiOutlineClose />
            </Link>
          </li>

          {items.map((item, index) => (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                <span className='icon'>{<item.icon/>}</span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
          <li className="nav-text">
            <Link onClick={()=>logout()}>
              <span><FiLogOut/></span>
              <span className="">Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
      </IconContext.Provider>
      
    </>
  );
}

export default Navbar;
