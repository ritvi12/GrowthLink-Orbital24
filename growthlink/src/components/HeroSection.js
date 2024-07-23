import React from 'react'
import { Button } from './Button'
import "./HeroSection.css"

const HeroSection = () => {

  

  return (
    <div className="hero-container">
      <div className = 'pagedescription'>
        <div className='hero-btns'>
          <Button className="btns" buttonStyle='btn--outline'
          buttonSize='btn--large' link='/signUp'>
              Get Started
          </Button>
          
        </div>
        <p>
        GrowthLink serves as a one-stop destination for students who wish to take on leadership positions to easily discover, 
        track, and access opportunities within NUS. 
        </p>
      </div>
    </div>
  )
}

export default HeroSection
