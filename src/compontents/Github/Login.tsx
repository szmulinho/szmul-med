import React, { useState } from 'react';

const LoginWithGithub: React.FC = () => {
    const [githubData, setGithubData] = useState<string>('');

    const handleLoginClick = async () => {
        try {
            const response = await fetch('/github/login/');
            if (response.ok) {
                const result = await response.json();
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
