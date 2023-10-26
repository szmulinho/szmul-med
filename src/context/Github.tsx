import React, { createContext, useContext, ReactNode, useState } from 'react';
import axios from 'axios';

export interface GithubUser {
    id: number;
    username: string;
    email: string;
    role: string;
}

export interface GitHubUserContextProps {
    user?: GithubUser;
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
    handleCallback: (code: string) => void;
}

const defaultContext: GitHubUserContextProps = {
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    handleCallback: (code: string) => {},
};

const githubClientId = '065d047663d40d183c04';
const redirectUri = 'https://szmul-med.onrender.com/github_user';

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

    const handleCallback = async (code: string) => {
        try {
            const response = await axios.get(`/github/callback?code=${code}`);
            const userData: GithubUser = response.data;
            setUser(userData);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error occurred while fetching data:', error);
        }
    };

    const contextValues: GitHubUserContextProps = {
        user,
        isLoggedIn,
        login,
        logout,
        handleCallback,
    };

    return <GitHubUserContext.Provider value={contextValues}>{children}</GitHubUserContext.Provider>;
};

export const useGitHubUserContext = () => {
    return useContext(GitHubUserContext);
};
