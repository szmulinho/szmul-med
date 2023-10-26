import React, { useEffect, useState } from 'react';
import { useGitHubUserContext } from '../../context/Github';

export const GithubProfile: React.FC = () => {
    const { githubUser, isLoggedIn, handleCallback } = useGitHubUserContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const code = localStorage.getItem('githubCode');
        if (code && !isLoggedIn) {
            // Call the handleCallback function to exchange code for user data
            handleCallback(code)
                .then(() => {
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [handleCallback, isLoggedIn]);

    return (
        <div>
            <h2>User Profile</h2>
            {loading ? (
                <div>Loading user data...</div>
            ) : isLoggedIn && githubUser ? (
                <div>
                    <h3>{githubUser.username}</h3>
                    <h3>{githubUser.email}</h3>
                    <h3>{githubUser.role}</h3>
                </div>
            ) : (
                <div>User not logged in or data not available.</div>
            )}
        </div>
    );
};

export default GithubProfile;
