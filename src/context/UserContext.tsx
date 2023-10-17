import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface User {
    login: string;
    role: string;
}

export interface UserContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    isLoggedIn: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(() => {
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
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
