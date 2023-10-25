import React, { useState } from 'react';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';

const LoginWithGithub = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        setIsLoading(true);
        window.location.href = 'https://szmul-med-github-login.onrender.com/github/login';
    };

    const handleCallback = async () => {
        try {
            const response = await fetch('https://szmul-med-github-login.onrender.com/login/github/callback');
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Wystąpił błąd podczas uzyskiwania dostępu do GitHub:', error);
        }
    };

    return (
        <div style={{ textAlign: 'justify' }}>
            <Button
                startIcon={<GitHubIcon />}
                variant="contained"
                sx={{
                    backgroundColor: '#24292e', // GitHub color
                    color: '#ffffff', // White text color
                    '&:hover': {
                        backgroundColor: '#1c2024', // Darker GitHub color on hover
                    },
                }}
                onClick={handleLogin}
            >
                Login with GitHub
            </Button>
        </div>
    );
};

export default LoginWithGithub;
