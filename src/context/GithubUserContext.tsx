import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface GithubUser {
    name: string;
    role: string;
}

export interface GithubUserContextProps {
    githubUser: GithubUser | null;
    setGithubUser: React.Dispatch<React.SetStateAction<GithubUser | null>>;
    isLoggedIn: boolean;
    login: (githubUserData: GithubUser) => void;
}

export const GithubUserContext = createContext<GithubUserContextProps | undefined>(undefined);

export function GithubUserContextProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [githubUser, setGithubUser] = useState<GithubUser | null>(() => {
        const storedGithubUser = localStorage.getItem('githubUser');
        return storedGithubUser ? JSON.parse(storedGithubUser) : null;
    });
    const [isLoggedIn, setLoggedIn] = useState<boolean>(() => !!githubUser);

    const login = (githubUserData: GithubUser) => {
        setGithubUser(githubUserData);
        setLoggedIn(true);
        localStorage.setItem('githubUser', JSON.stringify(githubUserData));
    };

    return (
        <GithubUserContext.Provider value={{ githubUser, setGithubUser, isLoggedIn, login }}>
            {children}
        </GithubUserContext.Provider>
    );
}
