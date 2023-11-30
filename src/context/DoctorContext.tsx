import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {GitHubUserContextProps} from "./Github";
import { Doctor } from '../data/doctors';
import { GithubUser } from '../data/github';



export interface DoctorContextProps {
    doctor: Doctor | GithubUser | null;
    setDoctor: React.Dispatch<React.SetStateAction<Doctor | null>>;
    isLoggedIn: boolean;
    login: (doctorData: Doctor) => void;
}

export const DoctorContext = createContext<DoctorContextProps | undefined>(undefined);

export function DoctorContextProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState<Doctor | null>(() => {
        const storedDoctor = localStorage.getItem('doctor');
        return storedDoctor ? JSON.parse(storedDoctor) : null;
    });
    const [isLoggedIn, setLoggedIn] = useState<boolean>(() => !!doctor);

    const login = (doctorData: Doctor) => {
        setDoctor(doctorData);
        setLoggedIn(true);
        localStorage.setItem('doctor', JSON.stringify(doctorData));
    };

    const logout = () => {
        setDoctor(null);
        setLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('doctor');
        localStorage.removeItem('githubUser');
        navigate('/doclog');
    };

    return (
        <DoctorContext.Provider value={{ doctor, setDoctor, isLoggedIn, login }}>
            {children}
        </DoctorContext.Provider>
    );
}
