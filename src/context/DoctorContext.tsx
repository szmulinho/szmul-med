import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface Doctor {
    login: string;
    role: string;
}

export interface DoctorContextProps {
    doctor: Doctor | null;
    setDoctor: React.Dispatch<React.SetStateAction<Doctor | null>>;
    isLoggedIn: boolean;
    login: (doctorData: Doctor) => void;
    logout: () => void;
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
        localStorage.removeItem('doctor');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <DoctorContext.Provider value={{ doctor, setDoctor, isLoggedIn, login, logout }}>
            {children}
        </DoctorContext.Provider>
    );
}
