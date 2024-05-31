import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as PiIcons from 'react-icons/pi'

export const NavBarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'DashBoard',
        path: '/dashboard',
        icon: <PiIcons.PiSquaresFourBold/>,
        cName: 'nav-text'
    },
    {
        title: 'Calendar',
        path: '/calendar',
        icon: <FaIcons.FaCalendar/>,
        cName: 'nav-text'
    }
]