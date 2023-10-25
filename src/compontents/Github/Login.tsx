import React, { useState } from 'react';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';

export function LoginWithGithub() {
    const [githubData, setGithubData] = useState<string>('');
    const [code, setCode] = useState('');

    const handleLoginClick = async () => {
        try {
            const response = await fetch('https://szmul-med-github-login.onrender.com/github/login/');
            if (response.ok) {
                const result = await response.json();
                const code = result.code; // Załóżmy, że 'code' jest polem w odpowiedzi z GitHub OAuth
                localStorage.setItem('code', code);
                setGithubData(JSON.stringify(result, null, 2));
            } else {
                console.error('Failed to fetch data from GitHub API');
            }
        } catch (error) {
            console.error('Error occurred while fetching data:', error);
        }
    };

    return (
        <div>
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
                onClick={handleLoginClick}
            >
                Login with GitHub
            </Button>
            {githubData ? (
                <pre>{githubData}</pre>
            ) : (
                <div>Loading GitHub data...</div>
            )}
        </div>
    );
}
