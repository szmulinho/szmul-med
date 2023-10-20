import React, { useState } from 'react';

const LoginWithGithub = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        setIsLoading(true);
        window.location.href = 'https://szmul-med-github-login.onrender.com/github';
    };

    const handleCallback = async () => {
        try {
            const response = await fetch('https://szmul-med-github-login.onrender.com/callback');
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Wystąpił błąd podczas uzyskiwania dostępu do GitHub:', error);
        }
    };

    return (
        <React.Fragment>
            {isLoading ? (
                <p>Proszę czekać...</p>
            ) : (
                <button onClick={handleLogin}>Zaloguj się z GitHub</button>
            )}
        </React.Fragment>
    );
};


export default LoginWithGithub;
