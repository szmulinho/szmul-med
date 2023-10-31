import React, { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {Doctor} from "./DoctorContext";

export interface GithubUser {
    id: number;
    login: string;
    email: string;
    role: string;
}

export interface GitHubUserContextProps {
    githubUser: GithubUser | null;
    setGithubUser: React.Dispatch<React.SetStateAction<GithubUser | null>>;
    isLoggedIn: boolean;
    login: (githubUserData: GithubUser) => void;
    handleCallback: (code: string) => void;
}

const githubClientId = '065d047663d40d183c04';
const redirectUri = 'https://szmul-med.onrender.com/github_user';

const urlParams = new URLSearchParams(window.location.search);
const receivedCode = urlParams.get('code');

if (receivedCode) {
    localStorage.setItem('code', receivedCode);
} else {
    console.error('Code not found in the URL.');
    console.log(receivedCode)
}


export const GitHubUserContext = createContext<GitHubUserContextProps | null>(null);

export function GithubUserContextProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [githubUser, setGithubUser] = useState<GithubUser | null>(() => {
        const storedGithubUser = localStorage.getItem('githubUser');
        return storedGithubUser ? JSON.parse(storedGithubUser) : null;
    });
    const [isLoggedIn, setLoggedIn] = useState<boolean>(() => !!githubUser);


    const login = (githubUserData: GithubUser) => {
        setGithubUser(githubUserData)
        setLoggedIn(true)
        localStorage.setItem('githubUser', JSON.stringify(githubUserData))
    }
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}`

    const handleCallback = async (code: string) => {
        try {
            const response = await axios.get(`https://szmul-med-github-login.onrender.com/github/callback?code=${code}`);
            if (response.status === 200) {
                const githubUserData: GithubUser = response.data;
                localStorage.setItem('githubUser', JSON.stringify(githubUserData));
                setGithubUser(githubUserData);
                setLoggedIn(true); // Set isLoggedIn to true after successful login
            } else {
                console.error('Invalid response status:', response.status);
            }
        } catch (error) {
            console.error('Error occurred while fetching data:', error);
        }
    };

    return (
        <GitHubUserContext.Provider value={{
            githubUser,
            setGithubUser,
            isLoggedIn,
            login,
            handleCallback
        }}>{children}</GitHubUserContext.Provider>
    );
}
