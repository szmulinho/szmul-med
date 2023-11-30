import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../data/users';
import {GithubUser} from "../data/github";


export interface UserContextProps {
    user: User | GithubUser | null;
    setUser: React.Dispatch<React.SetStateAction<User | GithubUser | null>>;
    isLoggedIn: boolean;
    login: (userData: User) => void;
    logout: () => void;
}


export const UserContext = createContext<UserContextProps | null>(null);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | GithubUser | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isLoggedIn, setLoggedIn] = useState<boolean>(() => !!user);

    const login = (userData: User) => {
        setUser(userData);
        setLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('doctor');
        localStorage.removeItem('githubUser');
        navigate('/login');
    };

    return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
