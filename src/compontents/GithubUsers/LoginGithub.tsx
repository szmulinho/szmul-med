import React, { useContext, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import {GithubUserContext, GithubUserContextProps} from '../../context/GithubUserContext'; // Ścieżka do pliku z kontekstem

const LoginWithGithub = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { githubUser, login } = useContext(GithubUserContext) as GithubUserContextProps;

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const response = await fetch('https://szmul-med-github-login.onrender.com/callback');
                if (response.ok) {
                    const data = await response.json();
                    login(data); // Logowanie użytkownika za pomocą kontekstu
                } else {
                    console.error('Błąd podczas pobierania danych z GitHub. Kod odpowiedzi:', response.status);
                }
            } catch (error) {
                console.error('Wystąpił błąd podczas uzyskiwania dostępu do GitHub:', error);
            }
        };


        if (githubUser === null) {
            handleCallback();
        }
    }, [githubUser, login]);

    const handleLogin = () => {
        setIsLoading(true);
        window.location.href = 'https://szmul-med-github-login.onrender.com/github';
    };

    return (
        <div style={{ textAlign: 'justify' }}>
            {githubUser ? (
                // Wyświetlanie zalogowanego użytkownika
                <div>Zalogowany jako: {githubUser.name}</div>
            ) : (
                // Wyświetlanie przycisku logowania
                <Button
                    variant="contained"
                    startIcon={<GitHubIcon />}
                    sx={{
                        backgroundColor: '#24292e',
                        color: '#ffffff',
                        '&:hover': {
                            backgroundColor: '#1c2024',
                        },
                    }}
                    onClick={handleLogin}
                >
                    Login with GitHub
                </Button>
            )}
        </div>
    );
};

export default LoginWithGithub;
