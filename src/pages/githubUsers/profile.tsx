import React from 'react';
import { GithubUserProfile } from "../../compontents/GithubUsers/GithubUserProfile";
import LoginGithub from "../../compontents/GithubUsers/LoginGithub";
import { useNavigate } from 'react-router-dom';

export function GithubUserProf() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    if (!token) {
        navigate('/login');
    }

    return (
        <div className="d-flex">
            {token ? <GithubUserProfile /> : <LoginGithub />}
        </div>
    );
}