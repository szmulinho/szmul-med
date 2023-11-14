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
                    const token = localStorage.getItem('token');
                    if (token) {
                        // Call the handleCallback function with the code parameter
                        await GetGithubUserData(token);
                    } else {
                        console.error('Token not found in localStorage.');
                    }
                } catch (error) {
                    console.error('Error occurred while fetching user data:', error);
                }
            }
        };

        fetchData(); // Call the fetchData function when component mounts
    }, [GetGithubUserData, githubUser]);


    return (
        <div>
            <h2>User Profile</h2>
            {githubUser ? (
                <div>
                    <img src={githubUser.avatar_url}/>
                        <h3>{githubUser.email}</h3>
                    <h3>{githubUser.login}</h3>
                    <h3>{githubUser.followers}</h3>
                    <h3>{githubUser.role}</h3>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>Loading user data...</div>
            )}
        </div>
    );
};

export default GithubProfile;
