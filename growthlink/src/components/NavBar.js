import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { NavBarData, adminNavBarData } from './NavBarData';
import './NavBar.css';
import { IconContext } from 'react-icons';
import { Button } from './Button';
import { useAuthValue } from '../assets/AuthContext';

const NavBar = () => {
    const [sidebar, setSideBar] = useState(false);
    const { isLoggedIn, signOut, user } = useAuthValue();
    const showSideBar = () => setSideBar(!sidebar);

    const getNavBarData = () => {
        if (user && user.role === 'admin') {
            return adminNavBarData;
        }
        return NavBarData;
    };

    return (
        <>
            <IconContext.Provider value={{ color: 'black' }}>
                <div className='navbar'>
                    <div className='menu-bars'>
                        <FaIcons.FaBars onClick={showSideBar} />
                    </div>
                    <NavLink className='Name' to='/'>GROWTHLINK</NavLink>
                    {isLoggedIn ? (
                        <div className='User'>Hey {user.name}!</div>
                    ) : (
                        <div className='User'>
                            <NavLink to='/logIn' className='navlink'>Log In</NavLink>
                            <Button className='get-started-btn' buttonStyle='btn--outline' link='/signUp'>Get Started</Button>
                        </div>
                    )}
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSideBar}>
                        <li className='navbar-toggle'>
                            <div className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </div>
                        </li>
                        {isLoggedIn && getNavBarData().map((item, index) => (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        ))}
                        <div className='button'>
                            <Link to={isLoggedIn ? "/home" : "/signUp"}>
                                {isLoggedIn ? (
                                    <Button buttonStyle='btn--outline' link="/" onClick={signOut}>SIGN OUT</Button>
                                ) : (
                                    <Button buttonStyle='btn--outline' link="/signUp">SIGN UP</Button>
                                )}
                            </Link>
                        </div>
                    </ul>
                </nav>
            </IconContext.Provider>
            <Outlet />
        </>
    );
};

export default NavBar;
