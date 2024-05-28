import React, { useState } from 'react'
import { Button } from './Button'
import "./HeroSection.css"

const HeroSection = () => {

  

  return (
    <div className="hero-container">
      
      <div className='hero-btns'>
        <Button className="btns" buttonStyle='btn--outline'
        buttonSize='btn--large'>
            SIGN UP NOW!
        </Button>
        
      </div>
    </div>
  )
}

export default HeroSection
