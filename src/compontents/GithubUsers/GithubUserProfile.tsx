import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {UserContext, UserContextProps} from "../../context/UserContext";
import {GithubUserContext, GithubUserContextProps, GithubUserContextProvider} from "../../context/GithubUserContext";

export function GithubUserProfile() {
    const navigate = useNavigate();
    const { githubUser, setGithubUser } = useContext(GithubUserContext) as GithubUserContextProps;
    const { logout } = useContext(UserContext) as UserContextProps;


    useEffect(() => {
        const fetchDataFromCallback = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/doctor_log');
                    return;
                }

            } catch (error) {
                console.error('Error fetching doctor data:', error);
                navigate('/doctor_log');
            }
        };

        fetchDataFromCallback();
    }, [navigate]);

    const handleLogout = () => {
        setGithubUser(null);
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (!githubUser) {
        return <div>Loading...</div>;
    }

    return (
        <GithubUserContextProvider>
        <div>
            <h2>Doctor Profile</h2>
            <p>Welcome, {githubUser.name}!</p>
            <p>Role: {githubUser.role}</p>
            <button onClick={logout}>Logout</button>
        </div>
        </GithubUserContextProvider>
    );
}

