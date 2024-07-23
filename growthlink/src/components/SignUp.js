import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../assets/AuthContext';
import './SignUp.css'
import { NavLink } from 'react-router-dom';

const SignUp = () => {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const {createUser} = useAuthValue();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
    }
    createUser(data);
    navigate('/logIn')

  }
  return (
    <div className='Container'>
      <div className='inputForm'>
        <h1>Sign Up!</h1>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder='Name' required ref={nameRef}/>
            <input type="email" placeholder='Enter email' required ref={emailRef}/>
            <input type='password' placeholder='Enter password' required ref={passwordRef}/>
            <button>Sign Up!</button>
        </form>
        <br/>
        <span> Already have an Account? &nbsp;</span>
        <NavLink to ='/logIn'>Log In</NavLink>
      </div>
    </div>
  )
}

export default SignUp
