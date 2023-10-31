import React, { useEffect } from 'react';
import { useGitHubUserContext } from '../../context/Github';

export const GithubProfile: React.FC = () => {
    const { githubUser, isLoggedIn, handleCallback } = useGitHubUserContext();

    useEffect(() => {
        const fetchData = async () => {
            if (isLoggedIn) {
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

        fetchData(); // Call the fetchData function when component mounts
    }, [handleCallback, isLoggedIn]);

    return (
        <div>
            <h2>User Profile</h2>
            {isLoggedIn && githubUser ? (
                <div>
                    <h3>{githubUser.login}</h3>
                    <h3>{githubUser.email}</h3>
                    <h3>{githubUser.role}</h3>
                </div>
            ) : (
                <div>Loading user data...</div>
            )}
        </div>
    );
};

export default GithubProfile;
