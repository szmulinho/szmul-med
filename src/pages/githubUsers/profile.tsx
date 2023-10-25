import React, { useEffect } from 'react';
import GithubProfile from "../../compontents/GithubUsers/GithubUserProfile"; // Upewnij się, że importujesz GithubProfile z odpowiedniego miejsca
import LoginGithub from "../../compontents/GithubUsers/LoginGithub";
import { useNavigate } from 'react-router-dom';

export function GithubUserProf() {
    const navigate = useNavigate();

    return (
        <div className="d-flex">
            <GithubProfile />
        </div>
    );
}