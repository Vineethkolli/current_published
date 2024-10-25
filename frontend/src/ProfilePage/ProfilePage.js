import React from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ user, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Step 1: Clear authentication data (for example, JWT token)
        localStorage.removeItem("token");

        // Step 2: Perform any additional cleanup actions like clearing user state
        onLogout();

        // Step 3: Redirect user to signup page after logout
        navigate("/signin");
    };

    return (
        <div className="container">
            <h2>Profile</h2>
            <div className="profile-info">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default ProfilePage;
