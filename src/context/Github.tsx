import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export interface GithubUser {
    id: number;
    login: string;
    email: string;
    role: string;
}

export interface GitHubUserContextProps {
    githubUser: GithubUser | null;
    isLoggedIn: boolean;
    login: (githubUserData: GithubUser) => void;
    handleCallback: (code: string) => void;
}

const githubClientId = '065d047663d40d183c04';
const redirectUri = 'https://szmul-med.onrender.com/github_user';

export const GitHubUserContext = createContext<GitHubUserContextProps | null>(null);

export function GithubUserContextProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const [githubUser, setGithubUser] = useState<GithubUser | null>(() => {
        const storedGithubUser = localStorage.getItem('githubUser');
        return storedGithubUser ? JSON.parse(storedGithubUser) : null;
    });
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const receivedCode = urlParams.get('code');

        if (receivedCode) {
            handleCallback(receivedCode); // Handle the received code when it's present
        }
    }, []); // Empty dependency array ensures this effect runs once, similar to componentDidMount

    const login = (githubUserData: GithubUser) => {
        setGithubUser(githubUserData);
        setLoggedIn(true);
        localStorage.setItem('githubUser', JSON.stringify(githubUserData));
    };

    const handleCallback = async (code: string) => {
        try {
            const response = await axios.get(`https://szmul-med-github-login.onrender.com/github/callback?code=${code}`);
            if (response.status === 200) {
                const githubUserData: GithubUser = response.data;
                localStorage.setItem('githubUser', JSON.stringify(githubUserData));
                setGithubUser(githubUserData);
                setLoggedIn(true);
            } else {
                console.error('Invalid response status:', response.status);
            }
        } catch (error) {
            console.error('Error occurred while fetching data:', error);
        }
    };

    return (
        <GitHubUserContext.Provider value={{ githubUser, isLoggedIn, login, handleCallback }}>
            {children}
        </GitHubUserContext.Provider>
    );
}
