import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GithubUserContext, GithubUserContextProps } from "../../context/GithubUserContext";

export function GithubUserProfile() {
    const navigate = useNavigate();
    const { githubUser, setGithubUser, logout } = useContext(GithubUserContext) as GithubUserContextProps;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token || !githubUser) {
                    navigate('/doctor_log');
                    return;
                }

                // Fetch additional user data from your API
                const response = await fetch(`/api/github/user/${githubUser.id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    setGithubUser(userData);
                } else {
                    console.error('Error fetching user data:', response.statusText);
                    navigate('/doctor_log');
                }

            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/doctor_log');
            }
        };

        fetchData();
    }, [githubUser, setGithubUser, navigate]);

    const handleLogout = () => {
        setGithubUser(null);
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (!githubUser) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p>Welcome, {githubUser.username}!</p>
            <p>Email: {githubUser.email}</p>
            <p>Role: {githubUser.role}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
