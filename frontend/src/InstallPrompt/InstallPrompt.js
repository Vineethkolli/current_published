import React from 'react';
import './InstallPrompt.css'; // Create a CSS file for styling

const InstallPrompt = ({ onInstall, onClose }) => {
    return (
        <div className="install-prompt-container">
            <h2>Download Our App</h2>
            <p>For a better experience, download our app!</p>
            <div className="install-prompt-buttons">
                <button onClick={onInstall}>Install App</button>
                <button onClick={onClose}>Not Now</button>
            </div>
        </div>
    );
};

export default InstallPrompt;
