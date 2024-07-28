import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as PiIcons from 'react-icons/pi'

export const NavBarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Bookmarks',
        path: '/dashboard',
        icon: <FaIcons.FaRegBookmark />,
        cName: 'nav-text'
    },
    {
        title: 'Calendar',
        path: '/calendar',
        icon: <FaIcons.FaCalendar />,
        cName: 'nav-text'
    }
];

export const adminNavBarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Bookmarks',
        path: '/dashboard',
        icon: <FaIcons.FaRegBookmark />,
        cName: 'nav-text'
    },
    {
        title: 'Admin Dashboard',
        path: '/adminDashboard',
        icon: <PiIcons.PiSquaresFourBold />,
        cName: 'nav-text'
    },
    {
        title: 'Calendar',
        path: '/calendar',
        icon: <FaIcons.FaCalendar />,
        cName: 'nav-text'
    }
];
