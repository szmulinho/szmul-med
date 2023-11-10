import React, {useContext, useEffect} from 'react';
import {GitHubUserContext, GitHubUserContextProps} from '../../context/Github';

export const GithubCallback: React.FC = () => {
    const { githubUser, isLoggedIn, handleCallback, handleLogout } = useContext(GitHubUserContext) as GitHubUserContextProps;

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
                    <img src={githubUser.avatar_url}/>
                    <h3>{githubUser.email}</h3>
                    <h3>{githubUser.login}</h3>
                    <h3>{githubUser.followers}</h3>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>Loading user data...</div>
            )}
        </div>
    );
};

export default GithubCallback;