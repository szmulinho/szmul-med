import React, { useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import { GitHubUserContext, GithubUser, GitHubUserContextProps } from '../../context/Github';

const LoginWithGithub: React.FC = () => {
    const { login, githubUser, handleCallback, isLoggedIn, logout } = useContext(GitHubUserContext) as GitHubUserContextProps;

    useEffect(() => {
        // Handle logic on component mount if needed
    }, []); // Empty dependency array ensures the effect runs once after initial render

    const handleLoginClick = () => {
        login();
    };

    const handleLogoutClick = () => {
        logout();
    };

    return (
        <div>
            {!isLoggedIn ? (
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
                    onClick={handleLoginClick}
                >
                    Login with GitHub
                </Button>
            ) : (
                <div>
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
                        onClick={handleLogoutClick}
                    >
                        Logout
                    </Button>
                    <div>
                        <strong>User Info:</strong>
                        <pre>{JSON.stringify(githubUser, null, 2)}</pre>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginWithGithub;
