import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GithubUser } from '../data/github-login';

export interface GithubUserContextProps {
    githubUser: GithubUser | null;
    setGithubUser: React.Dispatch<React.SetStateAction<GithubUser | null>>;
    isLoggedIn: boolean;
    login: (githubUserData: GithubUser) => void;
    logout: () => void;
}

export const GithubUserContext = createContext<GithubUserContextProps | undefined>(undefined);

export function GithubUserContextProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [githubUser, setGithubUser] = useState<GithubUser | null>(() => {
        const storedGithubUser = localStorage.getItem('githubUser');
        return storedGithubUser ? JSON.parse(storedGithubUser) : null;
    });
    const [isLoggedIn, setLoggedIn] = useState<boolean>(() => !!githubUser);

    useEffect(() => {
        // If githubUser is not present in localStorage, redirect to login page
        if (!githubUser) {
            navigate('/login');
        }
    }, [githubUser, navigate]);

    const login = (githubUserData: GithubUser) => {
        setGithubUser(githubUserData);
        setLoggedIn(true);
        localStorage.setItem('githubUser', JSON.stringify(githubUserData));
    };

    const logout = () => {
        setGithubUser(null);
        setLoggedIn(false);
        localStorage.removeItem('githubUser');
        navigate('/login');
    };

    return (
        <GithubUserContext.Provider value={{ githubUser, setGithubUser, isLoggedIn, login, logout }}>
            {children}
        </GithubUserContext.Provider>
    );
}
