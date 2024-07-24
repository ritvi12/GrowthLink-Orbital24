import React from 'react'
import HeroSection from '../components/HeroSection'
import Events from './Events'

const LandingPage = () => {
  return (
    <>
      <HeroSection/>
      <div className='features'>
      <h4>Features: </h4>
      <div className='addToCalendar'>
        <img src ='#'></img>
        <p>Add to calendar</p>
      </div>
      </div>
      <Events/>
    </>
  )
}

export default LandingPage
