import React, { useContext } from 'react';
import { GitHubUserContext, GitHubUserContextProps } from '../../context/Github';

const LoginWithGithub = () => {
    const { handleCallback, githubUser } = useContext(GitHubUserContext) as GitHubUserContextProps;

    const handleLoginClick = () => {
        if (!githubUser) {
            window.location.href = 'https://szmul-med-github-login.onrender.com/login';
        }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const receivedCode = urlParams.get('code');

    if (receivedCode) {
        handleCallback(receivedCode);
    }

    return (
        <div>
            {!githubUser && (
                <button onClick={handleLoginClick}>Login with GitHub</button>
            )}
            {githubUser && <p>Logged in with GitHub!</p>}
        </div>
    );
};

export default LoginWithGithub;
