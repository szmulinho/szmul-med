import React, { useContext } from 'react';
import {GitHubUserContext, GitHubUserContextProps} from '../../context/Github';

const LoginWithGithub = () => {
    const { isLoggedIn, handleCallback } = useContext(GitHubUserContext) as GitHubUserContextProps;

    const handleLoginClick = () => {
        if (!isLoggedIn) {
            window.location.href = 'https://szmul-med-github-login.onrender.com/github/login';
        }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const receivedCode = urlParams.get('code');

    if (receivedCode) {
        handleCallback(receivedCode);
    }

    return (
        <div>
            {!isLoggedIn && (
                <button onClick={handleLoginClick}>Login with GitHub</button>
            )}
            {isLoggedIn && <p>Logged in with GitHub!</p>}
        </div>
    );
};

export default LoginWithGithub;
