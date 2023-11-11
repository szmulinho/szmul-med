import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export interface GithubUser {
    login: string;
    email: string;
    avatar_url: string;
    followers: number;
    role: string;
}

export interface GitHubUserContextProps {
    githubUser: GithubUser | null;
    isLoggedIn: boolean;
    login: (githubUserData: GithubUser) => void;
    handleCallback: (code: string) => void;
    handleLogout: () => void;
}

const githubClientId = '33f5f8298ded51f76f30';
const redirectUri = 'https://szmul-med.onrender.com/github_user';

export const GitHubUserContext = createContext<GitHubUserContextProps | null>(null);

export function GithubUserContextProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const [githubUser, setGithubUser] = useState<GithubUser | null>(() => {
        const storedGithubUser = localStorage.getItem('githubUser');
        return storedGithubUser ? JSON.parse(storedGithubUser) : null;
    });
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                const response = await axios.get(`https://szmul-med-github-login.onrender.com/callback?code=${code}`);
                if (response.status === 200) {
                    const githubUserData: GithubUser = response.data;
                    localStorage.setItem('githubUser', JSON.stringify(githubUserData));
                    localStorage.setItem('code', JSON.stringify(githubUserData));
                    setGithubUser(githubUserData);
                    setLoggedIn(true);
                } else {
                    console.error('Invalid response status:', response.status);
                }
            } else {
                console.error('Code not found in URL parameters.');
            }
        } catch (error) {
            console.error('Error occurred while fetching data:', error);
        }
    };


    useEffect(() => {
        fetchData(); // Call the fetchData function when component mounts
    }, []); // Empty dependency array ensures this effect runs once, similar to componentDidMount

    const login = (githubUserData: GithubUser) => {
        setGithubUser(githubUserData);
        setLoggedIn(true);
        localStorage.setItem('githubUser', JSON.stringify(githubUserData));
        localStorage.setItem('code', JSON.stringify(githubUserData));
    };

    const handleLogout = () => {
        setGithubUser(null);
        localStorage.removeItem('code');
        localStorage.removeItem('githubUser');
        navigate('/login');
        window.location.reload();
    };

    const handleCallback = async (code: string) => {
        fetchData();
        navigate("/githubprofile")
    };

    return (
        <GitHubUserContext.Provider value={{ githubUser, isLoggedIn, login, handleCallback, handleLogout }}>
            {children}
        </GitHubUserContext.Provider>
    );
}
