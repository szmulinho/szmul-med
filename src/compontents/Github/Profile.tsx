import React, { useEffect, useState } from 'react';
import { useGitHubUserContext } from '../../context/Github';

export const GithubProfile: React.FC = () => {
    const { githubUser, isLoggedIn, handleCallback } = useGitHubUserContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('GithubProfile Component Mounted');

        const code = localStorage.getItem('githubCode');
        console.log('Stored GitHub Code:', code);

        if (code && !isLoggedIn) {
            console.log('Code exists and user is not logged in. Proceeding with handleCallback.');

            // Call the handleCallback function to exchange code for user data
            handleCallback(code)
                .then(() => {
                    console.log('handleCallback successful. User data loaded:', githubUser);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    setLoading(false);
                });
        } else {
            console.log('Code does not exist or user is already logged in. Setting loading to false.');
            setLoading(false);
        }
    }, [handleCallback, isLoggedIn, githubUser]);

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
