import React, { ReactElement } from 'react';
import GitHubLogin from 'react-github-login';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import { getGithubUserData } from '../../data/github-login'; // Import funkcji pobierającej dane z API

interface GitHubLoginButtonProps {
    onSuccess: (user: any) => void;
    onFailure: (response: any) => void;
}

const GitHubLoginButton: React.FC<GitHubLoginButtonProps> = ({ onSuccess, onFailure }: GitHubLoginButtonProps): ReactElement => {
    const clientId = '065d047663d40d183c04'; // Replace with your GitHub App client ID

    const onSuccessHandler = (response: any): void => {
        console.log(response);
        // Pobierz dane użytkownika po udanym zalogowaniu
        getGithubUserData(response.code) // Przekazujemy code do funkcji pobierającej dane użytkownika
            .then((user) => {
                // Handle successful login, e.g., store user data in state or localStorage
                onSuccess(user); // Przekazujemy dane użytkownika do przekazanej funkcji onSuccess
            })
            .catch((error) => {
                console.error(error);
                // Handle error if unable to fetch user data
                onFailure(error); // Przekazujemy błąd do przekazanej funkcji onFailure
            });
    };

    const onFailureHandler = (response: any): void => {
        console.error(response);
        // Handle failed login
        onFailure(response); // Przekazujemy błąd do przekazanej funkcji onFailure
    };

    return (
        <div style={{ textAlign: 'justify' }}>
            <GitHubLogin
                clientId={clientId}
                onSuccess={onSuccessHandler}
                onFailure={onFailureHandler}
                redirectUri="" // Twój URI przekierowania, jeśli wymagane
                buttonText="Login with GitHub"
                className="github-login-button"
            />
        </div>
    );
};

export default GitHubLoginButton;
