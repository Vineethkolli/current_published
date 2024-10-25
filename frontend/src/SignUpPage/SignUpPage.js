import "./SignUpPage.css";
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useState } from "react";

function SignUpPage() {
    const [signupdata, setsignupdata] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setsignupdata({ ...signupdata, [name]: value });
        setError('');
        setSuccessMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation checks
        if (!signupdata.name || !signupdata.phoneNumber || !signupdata.email || !signupdata.password) {
            setError('Please fill out all fields');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(signupdata.email)) {
            setError("Please enter a valid email");
            return;
        }

        if (!/^\d+$/.test(signupdata.phoneNumber)) {
            setError("Phone number should contain only digits");
            return;
        }

        if (signupdata.password.length <= 4) {
            setError("Password should be longer than 4 characters");
            return;
        }

        try {
            const response = await fetch("http://localhost:3820/signupDetails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signupdata),
            });

            if (response.status === 200) {
                setSuccessMessage("Signup successful, please sign in");
                setTimeout(() => {
                    navigate('/signin');  // Redirect after 2 seconds
                }, 2000);
            } else if (response.status === 400) {
                setError("User already exists");
            } else {
                setError("An error occurred. Please try again.");
            }
        } catch (error) {
            console.error("Error during fetch:", error);
            setError("Network error, please try again later.");
        }
    };

    return (
        <div className='signup-main-container'>
            <form onSubmit={handleSubmit} className='signup-form-container'>
                <div>
                    <h1 style={{ color: 'black', fontFamily: 'Rockwell' }}>Sign Up</h1>
                </div>

                <div className='signup-input-container'>
                    <label className='signup-label-element-name'>Name</label>
                    <input
                        className='signup-label-element'
                        onChange={handleChange}
                        type='text'
                        placeholder='Name'
                        name='name'
                    />
                </div>

                <div className='signup-input-container'>
                    <label className='signup-label-element-phone'>Phone Number</label>
                    <input
                        className='signup-label-element'
                        onChange={handleChange}
                        type='text'
                        placeholder='Phone Number'
                        name='phoneNumber'
                    />
                </div>

                <div className='signup-input-container'>
                    <label className='signup-label-element-email'>Email</label>
                    <input
                        className='signup-label-element'
                        onChange={handleChange}
                        type='text'
                        placeholder='Email'
                        name='email'
                    />
                </div>

                <div className='signup-input-container'>
                    <label className='signup-label-element-password'>Password</label>
                    <input
                        className='signup-label-element'
                        onChange={handleChange}
                        type='password'
                        placeholder='Password'
                        name='password'
                    />
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

                <div className='signup-button-container'>
                    <Link to='/signin' className='signup-link'>
                        <button className='signup-button-css' type='button'>Sign In</button>
                    </Link>
                    <button className='signup-button-css' type='submit'>Sign Up</button>
                </div>
            </form>
            <Outlet />
        </div>
    );
}

export default SignUpPage;
