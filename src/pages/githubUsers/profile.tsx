import React from 'react';
import { GithubUser } from '../../data/github-login';

const GithubProfile: React.FC<{ githubUser: GithubUser }> = ({ githubUser }) => {
    return (
        <div>
            <h1>{githubUser.username}</h1>
            <p>{githubUser.email}</p>
            <p>{githubUser.role}</p>
        </div>
    );
};

export default GithubProfile;
