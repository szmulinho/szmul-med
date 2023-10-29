import React from 'react';
import { useGitHubUserContext, GithubUser } from '../../context/Github';
import LoginWithGithub from '../Github/Login'; // Make sure to import your Login component

export function GithubUserProfile(): React.ReactElement {
    const { githubUser, isLoggedIn, login, logout, handleCallback } = useGitHubUserContext();

    const renderProfile = () => {
        if (isLoggedIn && githubUser) {
            return (
                <div>
                    <h1>Welcome, {githubUser.username}!</h1>
                    <p>Email: {githubUser.email}</p>
                    <p>Role: {githubUser.role}</p>
                    <button onClick={logout}>Logout</button>
                </div>
            );
        } else {
            return <LoginWithGithub />;
        }
    };

    return <div>{renderProfile()}</div>;
}
