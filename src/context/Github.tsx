import React, { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';

export interface GithubUser {
    id: number;
    username: string;
    email: string;
    role: string;
}

export interface GitHubUserContextProps {
    githubUser?: GithubUser;
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
    handleCallback: (code: string) => Promise<void> // Return a Promise
    setGithubUser: Dispatch<SetStateAction<GithubUser | undefined>>;
}

const defaultContext: GitHubUserContextProps = {
    isLoggedIn: false,
    login: async () => {}, // Return a Promise<void>
    logout: async () => {}, // Return a Promise<void>
    handleCallback: async (code: string) => {}, // Return a Promise<void>
    setGithubUser: () => {}, // You can use setState, so it doesn't return anything
};


const githubClientId = '065d047663d40d183c04';
const redirectUri = 'https://szmul-med-github-login.onrender.com/github/callback';

export const GitHubUserContext = createContext<GitHubUserContextProps>(defaultContext);

export const GitHubUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<GithubUser | undefined>(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}`;
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(undefined);
    };

    const setGithubUser: GitHubUserContextProps['setGithubUser'] = (userData) => {
        setUser(userData);
    };

    const handleCallback = async (code: string) => {
        try {
            const response = await axios.get(`https://szmul-med-github-login.onrender.com/github/callback?code=${code}`);
            const userData: GithubUser = response.data;
            setUser(userData);
            setIsLoggedIn(true);
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
