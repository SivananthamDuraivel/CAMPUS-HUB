import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { useAuthContext } from "../../hooks/useAuthContext";
import { IconContext } from 'react-icons';
import './Sidebar.css';

function Navbar() {
  const {user} = useAuthContext();
  const role = user.role;
  console.log(role)
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const items = SidebarData[role] || [];

  return (
    <>
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className='navbar'>
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
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
        </ul>
      </nav>
      </IconContext.Provider>
      
    </>
  );
}

export default Navbar;
