import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../AuthContext';
import './SignUp.css'

const LogIn = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const {signIn} = useAuthValue();

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        const status = await signIn(data);
        (status ? navigate('/home') : navigate('/logIn'))
    }

  return (
    <div className='Container'>
      <div className='inputForm'>
        <h1>Log In</h1>
        <form action='' onSubmit={handleSubmit}>
            <input type="email" placeholder='Enter Email' required ref={emailRef}/>
            <input type="password" placeholder="Enter Password" required ref={passwordRef}/>
            <button>Log In</button>
        </form>
      </div>
    </div>
  )
}

export default LogIn
