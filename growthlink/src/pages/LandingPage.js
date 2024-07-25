import React from 'react'
import HeroSection from '../components/HeroSection'
import Events from './Events'
import './LandingPage.css';

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <div className='features'>
        <h2>Features: </h2>
        <div className='ind-feature'>
          <div className='addToCalendar'>
            <img src='#'></img>
            <p>Add to calendar</p>
          </div>
        </div>
      </div>
      <Events />
    </>
  )
}

export default LandingPage
