import React, { ReactElement, useEffect } from 'react';
import GitHubLogin from 'react-github-login';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';

interface GitHubLoginButtonProps {
    onSuccess: (response: any) => void;
    onFailure: (response: any) => void;
}

const GitHubLoginButton: React.FC<GitHubLoginButtonProps> = ({ onSuccess, onFailure }: GitHubLoginButtonProps): ReactElement => {
    const clientId = '065d047663d40d183c04'; // Replace with your GitHub App client ID

    const onSuccessHandler = (response: any): void => {
        console.log(response);
        // Handle success, pass the response to the parent component
        onSuccess(response);
    };

    const onFailureHandler = (response: any): void => {
        console.error(response);
        // Handle failure, pass the response to the parent component
        onFailure(response);
    };

    useEffect(() => {
        // Check if the URL contains code parameter after redirect from GitHub
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            // If code parameter exists, perform a fetch request to the backend to complete the GitHub login process
            fetch('https://szmul-med-github-user.onrender.com/github' + code)
                .then(response => response.json())
                .then(data => {
                    // Handle the user data received from the backend
                    console.log(data);
                    // You can pass this data to the parent component or perform any other actions
                })
                .catch(error => {
                    console.error(error);
                    // Handle error if needed
                });
        }
    }, []); // Empty dependency array ensures this effect runs once after the initial render

    return (
        <div style={{ textAlign: 'justify' }}>
            <GitHubLogin clientId={clientId} onSuccess={onSuccessHandler} onFailure={onFailureHandler} redirectUri="" scope="" buttonText="Login with GitHub" />
        </div>
    );
};

export default GitHubLoginButton;
