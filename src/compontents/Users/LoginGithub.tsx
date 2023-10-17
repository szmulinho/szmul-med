import React, { ReactElement } from 'react';
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
        // Handle successful login, e.g., store user data in state or localStorage
        onSuccess(response);
    };

    const onFailureHandler = (response: any): void => {
        console.error(response);
        // Handle failed login
        onFailure(response);
    };

    return (
        <div style={{ textAlign: 'justify' }}>
            <Button
                variant="contained"
                startIcon={<GitHubIcon />}
                sx={{
                    backgroundColor: '#24292e', // GitHub color
                    color: '#ffffff', // White text color
                    '&:hover': {
                        backgroundColor: '#1c2024', // Darker GitHub color on hover
                    },
                }}
            >
                Login with GitHub
            </Button>
        </div>
    );
};

export default GitHubLoginButton;
