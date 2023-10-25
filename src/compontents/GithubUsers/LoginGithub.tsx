import React, { useState } from 'react';
import axios from 'axios';
import { GithubUser } from '../../data/github-login';
import GithubProfile from '../../pages/githubUsers/profile';

const GithubLogin: React.FC = () => {
    const [githubUser, setGithubUser] = useState<GithubUser>();

    const handleLogin = async () => {
        const response = await axios.get('/login');
        const githubUser = response.data as GithubUser;

        setGithubUser(githubUser);
    };

    return (
        <div>
            <button onClick={handleLogin}>Login with GitHub</button>

            {githubUser && (
                <GithubProfile githubUser={githubUser} />
            )}
        </div>
    );
};

export default GithubLogin;
