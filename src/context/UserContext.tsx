import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../data/prescription';
import {useNavigate} from "react-router-dom";


export interface UserContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    isLoggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    isDoctor: boolean
    role: string | null; // Dodaj role
    login: (userData: User) => void;
    logout: () => void;
}


export const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isDoctor, setIsDoctor] = useState(false);
    const [role, setRole] = useState<string | null>(null);
    const [isLoggedIn, setLoggedIn] = useState(false);



    useEffect(() => {
        const token = localStorage.getItem('token');
        const loggedInUser = localStorage.getItem('user');

        if (token && loggedInUser) {
            setUser(JSON.parse(loggedInUser));

            if (JSON.parse(loggedInUser)?.role === 'doctor') {
                setIsDoctor(true);
            }
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        if (userData.role === 'doctor' || userData.role === 'pharmacist') {
            setRole(userData.role); // Ustaw rolę użytkownika
        }
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ user, setUser, isDoctor , isLoggedIn, setLoggedIn, role, login, logout }}>
            {children}
        </UserContext.Provider>

    );
}
function setRole(role: string) {
    throw new Error('Function not implemented.');
}

