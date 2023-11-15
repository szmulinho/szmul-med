import React, { useContext, useEffect } from 'react';
import { GitHubUserContext, GitHubUserContextProps } from '../../context/Github';

export const GithubCallback: React.FC = () => {
    const { githubUser, handleCallback, handleLogout } = useContext(GitHubUserContext) as GitHubUserContextProps;

    useEffect(() => {
        const fetchData = async () => {
            if (githubUser) {
                try {
                    // Retrieve code from localStorage
                    const code = localStorage.getItem('code');
                    if (code) {
                        // Call the handleCallback function with the code parameter
                        await handleCallback(code);
                    } else {
                        console.error('Code not found in localStorage.');
                    }
                } catch (error) {
                    console.error('Error occurred while fetching user data:', error);
                }
            }
        };

        fetchData();
    }, [githubUser, handleCallback]);

    return (
        <div>

        </div>
    );
};

export default GithubCallback;
