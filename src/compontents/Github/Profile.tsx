import React, { useContext, useEffect, useState } from 'react';
import { GitHubUserContext, GitHubUserContextProps } from '../../context/Github';
import { GetGithubUserData, GithubUser } from '../../data/github';

const Profile: React.FC = () => {
    const { githubUser, handleLogout } = useContext(GitHubUserContext) as GitHubUserContextProps;
    const [userData, setUserData] = useState<GithubUser | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (githubUser) {
                try {
                    const { user, token } = await GetGithubUserData(githubUser);
                    setUserData(user);
                } catch (error) {
                    console.error('Error occurred while fetching user data:', error);
                }
            }
        };

        fetchData();
    }, [githubUser]);

    return (
        <div>
            <h2>User Profile</h2>
            {userData ? (
                <div>
                    <img src={userData.avatar_url} alt="User Avatar" />
                    <h3>{userData.email}</h3>
                    <h1>Hello {userData.login}!</h1>
                    <h2>Followers: {userData.followers}</h2>
                    <h3>GithubUser Role: {userData.role}</h3>
                    <h3>HTML Url: {userData.html_url}</h3>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>Loading user data...</div>
            )}
        </div>
    );
};

export default Profile;
