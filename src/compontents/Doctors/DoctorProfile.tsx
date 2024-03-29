import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { GetDoctorData, Doctor } from '../../data/doctors';
import {DoctorContext, DoctorContextProps} from "../../context/DoctorContext";
import {UserContext, UserContextProps} from "../../context/UserContext";
import {GitHubUserContext, GitHubUserContextProps} from "../../context/Github";

export function DoctorProfile() {
    const navigate = useNavigate();
    const { doctor, setDoctor } = useContext(DoctorContext) as DoctorContextProps || useContext(GitHubUserContext) as GitHubUserContextProps;
    const { logout } = useContext(UserContext) as UserContextProps;


    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const token = localStorage.getItem('token') || localStorage.getItem("code") || localStorage.getItem("githubUser") ;
                if (!token) {
                    navigate('/doctor_log');
                    return;
                }

            } catch (error) {
                console.error('Error fetching doctor data:', error);
                navigate('/doctor_log');
            }
        };

        fetchDoctorData();
    }, [navigate]);

    const handleLogout = () => {
        setDoctor(null);
        localStorage.removeItem('token');
        localStorage.removeItem('doctor');
        navigate('/doctor_log');
    };

    if (!doctor) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Doctor Profile</h2>
            <p>Welcome, {doctor.login}!</p>
            <p>Role: {doctor.role}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
