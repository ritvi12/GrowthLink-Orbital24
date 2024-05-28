import React, { useState } from 'react'
import { Button } from './Button'
import "./HeroSection.css"
import SignUpModal from './SignUpModal'

const HeroSection = () => {

  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(prev => !prev)
  }

  return (
    <div className="hero-container">
      
      <div className='hero-btns'>
        <Button className="btns" buttonStyle='btn--outline'
        buttonSize='btn--large' onClick={openModal}>
            SIGN UP NOW!
        </Button>
        <SignUpModal showModal={showModal} setShowModal={setShowModal}/>
      </div>
    </div>
  )
}

export default HeroSection
