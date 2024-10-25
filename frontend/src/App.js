import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from "./SignUpPage/SignUpPage";
import SignInPage from "./SignInPage/SignInPage";
import NavBar from './NavBar/NavBar';
import Welcome from './Welcome/Welcome';
import IncomeEntryPage from './IncomeEntryPage/IncomeEntryPage';
import ModifyIncomeDataPage from './ModifyIncomeDataPage/ModifyIncomeDataPage';
import CollectionPage from './CollectionPage/CollectionPage';
import ProfilePage from './ProfilePage/ProfilePage';
import InstallPrompt from './InstallPrompt/InstallPrompt'; // Import the prompt

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isInstallPromptVisible, setInstallPromptVisible] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    const handleSignIn = (user) => {
        setIsAuthenticated(true);
        setUserData(user);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserData(null);
    };

    useEffect(() => {
        // Check if user has dismissed the install prompt
        const hasDismissedInstallPrompt = localStorage.getItem('hasDismissedInstallPrompt');

        if (!hasDismissedInstallPrompt) {
            // Listen for the beforeinstallprompt event
            const handleBeforeInstallPrompt = (e) => {
                e.preventDefault(); // Prevent the mini-info bar from appearing on mobile
                setDeferredPrompt(e); // Stash the event so it can be triggered later
                setInstallPromptVisible(true); // Show our custom install prompt
            };

            window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

            // Cleanup listener on component unmount
            return () => {
                window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            };
        }
    }, []);

    const handleInstall = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt(); // Show the install prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                setInstallPromptVisible(false);
                setDeferredPrompt(null); // Clear the stored prompt
            });
        }
    };

    const handleClosePrompt = () => {
        setInstallPromptVisible(false);
        // Save user preference to local storage
        localStorage.setItem('hasDismissedInstallPrompt', 'true');
        // Redirect to the signin page
        window.location.href = '/signin';
    };

    return (
        <BrowserRouter>
            {isAuthenticated && <NavBar />}
            <Routes>
                {!isAuthenticated ? (
                    <>
                        <Route path="/" element={<Navigate to="/signin"/>} />
                        <Route path="/signin" element={<SignInPage onSignIn={handleSignIn} />} />
                        <Route path="/signup" element={<SignUpPage />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Navigate to="/welcome" />} />
                        <Route path="/welcome" element={<Welcome />} />
                        <Route path="/income-entry" element={<IncomeEntryPage />} />
                        <Route path="/modify-income" element={<ModifyIncomeDataPage />} />
                        <Route path="/collection" element={<CollectionPage />} />
                        <Route path="/profile" element={<ProfilePage user={userData} onLogout={handleLogout} />} />
                    </>
                )}
            </Routes>
            {isInstallPromptVisible && (
                <InstallPrompt 
                    onInstall={handleInstall} 
                    onClose={handleClosePrompt} 
                />
            )}
        </BrowserRouter>
    );
}

export default App;
