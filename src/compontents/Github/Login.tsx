import React, { useState } from 'react';

const LoginWithGithub: React.FC = () => {
    const [githubData, setGithubData] = useState<string>('');
    const [code, setCode] = useState('');


    const handleLoginClick = async () => {
        try {
            const response = await fetch('https://szmul-med-github-login.onrender.com/github/login/');
            if (response.ok) {
                const result = await response.json();
                const code = result.code; // Załóżmy, że 'code' jest polem w odpowiedzi z GitHub OAuth
                localStorage.setItem('githubCode', code);
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
            <button onClick={handleLoginClick}>Login with GitHub</button>
            {githubData ? (
                <pre>{githubData}</pre>
            ) : (
                <div>Loading GitHub data...</div>
            )}
        </div>
    );
};

export default LoginWithGithub;
