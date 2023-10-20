// GithubLoginButton.tsx

import React from 'react';
import Button from '@mui/material/Button';

interface GithubLoginButtonProps {
    onSuccess: (response: any) => void;
    onFailure: (response: any) => void;
}

const GithubLoginButton: React.FC<GithubLoginButtonProps> = ({ onSuccess, onFailure }) => {
    const handleLoginClick = () => {
        // Tutaj umieść kod obsługujący logowanie do GitHub
        // Po sukcesie wywołaj onSuccess(response)
        // Po niepowodzeniu wywołaj onFailure(response)
    };

    return (
        <Button variant="contained" color="primary" onClick={handleLoginClick}>
            Login with GitHub
        </Button>
    );
}

export default GithubLoginButton;
