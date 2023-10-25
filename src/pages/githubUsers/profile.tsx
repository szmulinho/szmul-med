import React, { useEffect } from 'react';
import GithubProfile from "../../compontents/GithubUsers/GithubUserProfile"; // Upewnij się, że importujesz GithubProfile z odpowiedniego miejsca
import LoginGithub from "../../compontents/GithubUsers/LoginGithub";
import { useNavigate } from 'react-router-dom';

export function GithubUserProf() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, []); // Pusta tablica dependencies oznacza, że useEffect uruchomi się tylko raz, po zamontowaniu komponentu.

    return (
        <div className="d-flex">
            <GithubProfile />
        </div>
    );
}
