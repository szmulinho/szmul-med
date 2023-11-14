import React, {useContext, useEffect} from 'react';
import {GitHubUserContext, GitHubUserContextProps} from '../../context/Github';
import {GetGithubUserData} from "../../data/github";

export const GithubProfile: React.FC = () => {
    const { githubUser, handleLogout } = useContext(GitHubUserContext) as GitHubUserContextProps;

    useEffect(() => {
        const fetchData = async () => {
            if (githubUser) {
                try {
                    // Retrieve code from localStorage
                    const tokenString = localStorage.getItem('tokenString');
                    if (tokenString) {
                        // Call the handleCallback function with the code parameter
                        await GetGithubUserData(tokenString);
                    } else {
                        console.error('Token not found in localStorage.');
                    }
                } catch (error) {
                    console.error('Error occurred while fetching user data:', error);
                }
            }
        };

        fetchData();
    }, [GetGithubUserData, githubUser]);


    return (
        <div>
            <h2>User Profile</h2>
            {githubUser ? (
                <div>
                    <img src={githubUser.avatar_url}/>
                        <h3>{githubUser.email}</h3>
                    <h1>Hello {githubUser.login}!</h1>
                    <h2>Followers: {githubUser.followers}</h2>
                    <h3>GithubUser Role: {githubUser.role}</h3>
                    <h3>HTML Url: {githubUser.html_url}</h3>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>Loading user data...</div>
            )}
        </div>
    );
};

export default GithubProfile;
