import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';

export function LoginWithGithub() {
    const [githubData, setGithubData] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const code = localStorage.getItem('code');
            if (code) {
                try {
                    const response = await fetch(`https://szmul-med-github-login.onrender.com/github/callback?code=${code}`);
                    if (response.ok) {
                        const result = await response.json();
                        setGithubData(JSON.stringify(result, null, 2));
                    } else {
                        console.error('Failed to fetch data from GitHub API');
                    }
                } catch (error) {
                    console.error('Error occurred while fetching data:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLoginClick = async () => {
        try {
            const response = await fetch('https://szmul-med-github-login.onrender.com/github/login/');
            if (response.ok) {
                const result = await response.json();
                const code = result.code;
                localStorage.setItem('code', code);
                window.location.href = result.redirectURL; // Przekieruj do GitHub OAuth
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
                disabled={loading}
            >
                Login with GitHub
            </Button>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <pre>{githubData}</pre>
            )}
        </div>
    );
}
