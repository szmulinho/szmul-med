import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../data/prescription';
import {useNavigate} from "react-router-dom";


export interface UserContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    isLoggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    handleLogout: () => void;
    login: (userData: User) => void;
    logout: () => void; // Dodajemy właściwość logout
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setLoggedIn] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setLoggedIn(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => { // Implementacja funkcji logout
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn, setLoggedIn, handleLogout, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
