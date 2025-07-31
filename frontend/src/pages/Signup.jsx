import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import './Signup.css';

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        phone: '',
        gender: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, phone } = signupInfo;
        if (!name || !email || !password || !phone) {
            return handleError('name, email, password , phone are required')
        }
        try {
            const url = `http://localhost:3004/api/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }
    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <div>
                        <label htmlFor='phone'>Phone</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ padding: '0 8px 15px' }}>+91</span>
                            <input
                                onChange={handleChange}
                                type='tel'
                                name='phone'
                                pattern="[0-9]{10}"
                                maxLength="10"
                                minLength="10"
                                required
                                value={signupInfo.phone}
                                style={{ flex: 1 }}
                            />
                        </div>
                    </div>

                </div>
                <div>
                    <div>
                        <label>Gender</label>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={signupInfo.gender === "Male"}
                                    onChange={handleChange}
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={signupInfo.gender === "Female"}
                                    onChange={handleChange}
                                />
                                Female
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Other"
                                    checked={signupInfo.gender === "Other"}
                                    onChange={handleChange}
                                />
                                Other
                            </label>
                        </div>

                    </div>
                </div>

                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                    />
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account ?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup
