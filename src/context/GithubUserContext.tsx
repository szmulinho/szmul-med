import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {GithubUser} from "../data/github-login";


export interface GithubUserContextProps {
    githubUser: GithubUser | null;
    setGithubUser: React.Dispatch<React.SetStateAction<GithubUser | null>>;
    isLoggedIn: boolean;
    login: (userData: GithubUser) => void;
}

export const GithubUserContext = createContext<GithubUserContextProps | undefined>(undefined);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [user, setUser] = useState<GithubUser | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isLoggedIn, setLoggedIn] = useState<boolean>(() => !!user);

    const login = (userData: GithubUser) => {
        setUser(userData);
        setLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    return (
        <GithubUserContext.Provider value={{ user, setUser, isLoggedIn, login }}>
            {children}
        </GithubUserContext.Provider>
    );
}
