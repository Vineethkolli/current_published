import "./SignInPage.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function SignInPage({ onSignIn }) {
    const [signindata, setSignindata] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignindata({ ...signindata, [name]: value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!signindata.email || !signindata.password) {
            setError('Enter all fields');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(signindata.email)) {
            setError("Please enter a valid email");
            return;
        }

        if (signindata.password.length <= 4) {
            setError("Password should be greater than 4 letters");
            return;
        }

        try {
            const response = await fetch("http://localhost:3820/signinDetails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signindata),
            });

            const data = await response.json();
            if (data.token) {
                const user = {
                    name: data.name,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                };
                onSignIn(user);  // Pass user data to App
                navigate("/welcome");  // Redirect to Welcome page
            } else {
                setError(data.message || "An error occurred");
            }
        } catch (error) {
            console.log(error);
            setError("An error occurred");
        }
    };

    return (
        <div className="signin-main-container">
            <form onSubmit={handleSubmit} className="signin-form-container">
                <div className="signin-input-container">
                    <label htmlFor="email" className="signin-label-element-email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={signindata.email}
                        onChange={handleChange}
                        required
                        className="signin-label-element"
                    />
                </div>
                <div className="signin-input-container">
                    <label htmlFor="password" className="signin-label-element-password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={signindata.password}
                        onChange={handleChange}
                        required
                        className="signin-label-element"
                    />
                </div>
                {error && <div className="signin-error-message">{error}</div>}
                <div className="signin-button-container">
                    <Link to="/signup">
                        <button className="signin-button-css" type="button">Sign Up</button>
                    </Link>
                    <button className="signin-button-css" type="submit">Sign In</button>
                </div>
            </form>
            <Outlet />
        </div>
    );
}

export default SignInPage;
