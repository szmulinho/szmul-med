import React, { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';

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
    handleCallback: () => void;
    setGithubUser: Dispatch<SetStateAction<GithubUser | undefined>>;
}

const defaultContext: GitHubUserContextProps = {
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    handleCallback: () => {},
    setGithubUser: () => {},
};

const githubClientId = '065d047663d40d183c04';
const redirectUri = 'https://szmul-med.onrender.com/github_user'; // Make sure this matches your GitHub OAuth callback URL

export const GitHubUserContext = createContext<GitHubUserContextProps>(defaultContext);

export const GitHubUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<GithubUser | undefined>(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const history = useHistory();

    const login = () => {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}`;
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(undefined);
        // Redirect to the home page or any other appropriate page after logout
        history.push('/');
    };

    const setGithubUser: GitHubUserContextProps['setGithubUser'] = (userData) => {
        setUser(userData);
    };

    const handleCallback = async () => {
        const code = new URLSearchParams(location.search).get('code');
        if (code) {
            try {
                const response = await axios.get(`https://szmul-med.onrender.com/github/callback?code=${code}`);
                const userData: GithubUser = response.data;
                setUser(userData);
                setIsLoggedIn(true);
            } catch (error) {
                console.error('Error occurred while fetching data:', error);
            }
        }
    };

    useEffect(() => {
        // Call handleCallback() when the component mounts to check if there's a GitHub code in the URL
        handleCallback();
    }, []); // Empty dependency array ensures this effect runs once after the initial render

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
