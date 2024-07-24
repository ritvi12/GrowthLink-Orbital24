import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../assets/AuthContext';
import './SignUp.css';
import { NavLink } from 'react-router-dom';

const SignUp = () => {
    const [tab, setTab] = useState('user'); // Default tab is 'user'
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const { createUser } = useAuthValue();

    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            role: tab // Pass the role as 'user' or 'admin'
        };
        createUser(data);
        navigate('/logIn');
    }

    return (
        <div className='Container'>
            <div className='inputForm'>
                <h1>Sign Up!</h1>
                <div className='tabs'>
                    <button
                        className={`tab ${tab === 'user' ? 'active' : ''}`}
                        onClick={() => setTab('user')}
                    >
                        User
                    </button>
                    <button
                        className={`tab ${tab === 'admin' ? 'active' : ''}`}
                        onClick={() => setTab('admin')}
                    >
                        Admin 
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Name' required ref={nameRef} />
                    <input type="email" placeholder='Enter email' required ref={emailRef} />
                    <input type='password' placeholder='Enter password' required ref={passwordRef} />
                    <button>Sign Up!</button>   
                </form>
                <br />
                <span>Already have an Account? &nbsp;</span>
                <NavLink to='/logIn'>Log In</NavLink>
            </div>
        </div>
    );
};

export default SignUp;
