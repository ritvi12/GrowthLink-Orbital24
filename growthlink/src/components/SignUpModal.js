import React from 'react'
import './SignUpModal.css'

const SignUpModal = ({showModal, setShowModal}) => {
  return (
    <>
    {showModal ? <div className='GlobalStyle'>Modal</div> : null}
    
    </>
  )
}

export default SignUpModal
