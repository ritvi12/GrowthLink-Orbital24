import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { Link, Outlet } from 'react-router-dom'
import { NavBarData } from './NavBarData'
import './NavBar.css'
import { IconContext } from 'react-icons'
import { Button } from './Button'
import { useAuthValue } from '../AuthContext'


const NavBar = () => {
    const [sidebar, setSideBar] = useState(false)

    const {isLoggedIn, signOut} = useAuthValue();

    const showSideBar = () => setSideBar(!sidebar)

    

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
           
            {isLoggedIn && NavBarData.map((item, index) => {
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
              <Link to={isLoggedIn ? "/" : "/signUp"}>
                {isLoggedIn ? <>
                  <Button buttonStyle='btn--outline' link="/" onClick={signOut}>SIGN OUT</Button>
                </> : <>
                <Button buttonStyle='btn--outline' link="/signUp">SIGN UP</Button>
                </>
                }
              </Link>
             
            </div>

        </ul>
        
      </nav>
      </IconContext.Provider> 
      <Outlet/>
    </>
  )
}

export default NavBar