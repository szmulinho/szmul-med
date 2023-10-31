import React, { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';

export interface GithubUser {
    id: number;
    login: string;
    email: string;
    role: string;
}

export interface GitHubUserContextProps {
    githubUser?: GithubUser;
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
    handleCallback: (code: string) => void;
    setGithubUser: Dispatch<SetStateAction<GithubUser | undefined>>;
}

const defaultContext: GitHubUserContextProps = {
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    handleCallback: (code: string) => {},
    setGithubUser: () => {},
};

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


export const GitHubUserContext = createContext<GitHubUserContextProps>(defaultContext);

export const GitHubUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<GithubUser | undefined>(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const login = () => {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}`
        ;
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(undefined);
    };

    const setGithubUser: GitHubUserContextProps['setGithubUser'] = (githubUser) => {
        setUser(githubUser);
    };

    const handleCallback = async (code: string) => {
        try {
            const response = await axios.get(`https://szmul-med-github-login.onrender.com/github/callback?code=${code}`);
            if (response.status === 200) {
                const userData: GithubUser = response.data;
                localStorage.setItem('githubUser', JSON.stringify(userData));
                setUser(userData);
                setIsLoggedIn(true);
            } else {
                console.error('Invalid response status:', response.status);
            }
        } catch (error) {
            console.error('Error occurred while fetching data:', error);
        }
    };



    const contextValues: GitHubUserContextProps = {
        isLoggedIn,
        login,
        logout,
        handleCallback,
        setGithubUser,
    };

    return <GitHubUserContext.Provider value={contextValues}>{children}</GitHubUserContext.Provider>;
};

export const useGitHubUserContext = () => {
    return useContext(GitHubUserContext);
};
