import React, { useEffect } from 'react';
import { useGitHubUserContext } from '../../context/Github';

export const GithubProfile: React.FC = () => {
    const { user, isLoggedIn, handleCallback } = useGitHubUserContext();

    useEffect(() => {
        const code = localStorage.getItem('githubCode');
        if (code && !isLoggedIn) {
            // Call the handleCallback function to exchange code for user data
            handleCallback(code);
        }
    }, [handleCallback, isLoggedIn]);

    return (
        <div>
            <h2>User Profile</h2>
            {isLoggedIn && user ? (
                <div>
                    <h3>{user.username}</h3>
                    <h3>{user.email}</h3>
                    <h3>{user.role}</h3>
                </div>
            ) : (
                <div>Loading user data...</div>
            )}
        </div>
    );
};

export default GithubProfile;
