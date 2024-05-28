import React, { useState, useEffect } from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { NavBarData } from './NavBarData'
import './NavBar.css'
import { IconContext } from 'react-icons'
import { Button } from './Button'

const NavBar = () => {
    const [sidebar, setSideBar] = useState(false)
    const [button, setButton] = useState(true);

    const showSideBar = () => setSideBar(!sidebar)

    const showButton = () => {
      if (window.innerWidth <= 960) {
        setButton(false);
      } else {
        setButton(true);
      }
    };
  
    useEffect(() => {
      showButton();
    }, []);
  
    window.addEventListener('resize', showButton);
  return (
    <>
    <IconContext.Provider value={{color: 'black'}}>
      <div className='navbar'>
        <Link to="/" className='menu-bars'>
            <FaIcons.FaBars onClick={showSideBar} />
        </Link>
        <div className='Name'>GROWTHLINK</div>
      </div>
      <nav className= {sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSideBar}>
            <li className='navbar-toggle'>
                <Link to="#" className='menu-bars'>
                    <AiIcons.AiOutlineClose />
                </Link>
            </li>
            {NavBarData.map((item, index) => {
                return (
                    <li key={index} className={item.cName}>
                        <Link to = {item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    </li>
                )
            })}
            <div className='button'>
              {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
            </div>
        </ul>
        
      </nav>
      </IconContext.Provider>
    </>
  )
}

export default NavBar