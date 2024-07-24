import React, { useRef, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuthValue } from '../assets/AuthContext';
import './SignUp.css'; 

const LogIn = () => {
    const [activeTab, setActiveTab] = useState('user');
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const { signIn } = useAuthValue();

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            role: activeTab
        };

        try {
            const status = await signIn(data);
            
            if (status) {
                navigate('/home');
            } 
        } catch (error) {
            console.error("Login failed", error);
        }
    }

    return (
        <div className="Container">
            <div className='inputForm'>
                <h1>Log In</h1>
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'user' ? 'active' : ''}`}
                        onClick={() => setActiveTab('user')}
                    >
                        User
                    </button>
                    <button
                        className={`tab ${activeTab === 'admin' ? 'active' : ''}`}
                        onClick={() => setActiveTab('admin')}
                    >
                        Admin
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='Enter Email' required ref={emailRef} />
                    <input type="password" placeholder="Enter Password" required ref={passwordRef} />
                    <button>Log In</button>
                </form>
                <br />
                <span> Don't have an account? &nbsp;</span>
                <NavLink to='/signUp'>Sign Up</NavLink>
            </div>
        </div>
    );
};

export default LogIn;
