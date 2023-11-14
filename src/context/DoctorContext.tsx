import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {GithubUser, GitHubUserContext, GitHubUserContextProps } from './Github';

export interface Doctor {
    login: string;
    role: string;
}

export interface DoctorContextProps {
    doctor: Doctor | null;
    setDoctor: React.Dispatch<React.SetStateAction<Doctor | null>>;
    isLoggedIn: boolean;
    login: (userData: Doctor | GithubUser) => void;
    handleLogout: () => void;
}

export const DoctorContext = createContext<DoctorContextProps | undefined>(undefined);

export function DoctorContextProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const { githubUser, isLoggedIn: isGithubUserLoggedIn, login: githubUserLogin, handleLogout: githubUserHandleLogout } = useContext(GitHubUserContext) as GitHubUserContextProps;
    const [doctor, setDoctor] = useState<Doctor | null>(() => {
        const storedDoctor = localStorage.getItem('doctor');
        return storedDoctor ? JSON.parse(storedDoctor) : null;
    });

    const isLoggedIn = isGithubUserLoggedIn || !!doctor;

    const login = (userData: Doctor | GithubUser) => {
        if ('login' in userData) {
            // Jeśli 'login' istnieje w userData, to oznacza, że to dane dla Doctor
            setDoctor(userData as Doctor);
            localStorage.setItem('doctor', JSON.stringify(userData));
        } else {
            // W przeciwnym razie są to dane dla GithubUser
            githubUserLogin(userData as GithubUser);
        }
    };

    const handleLogout = () => {
        setDoctor(null);
        localStorage.removeItem('doctor');
        githubUserHandleLogout();
        navigate('/login');
    };

    const doctorContextProps: DoctorContextProps = {
        doctor,
        setDoctor,
        isLoggedIn,
        login,
        handleLogout,
    };

    return (
        <DoctorContext.Provider value={doctorContextProps}>
            {children}
        </DoctorContext.Provider>
    );
}
