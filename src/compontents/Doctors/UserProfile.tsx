import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { GetUserData, User } from '../../data/prescription';
import {UserContext, UserContextProps} from "../../context/UserContext";

export function UserProfile() {
    const navigate = useNavigate();
    const { user, setUser, logout } = useContext(UserContext) as UserContextProps;


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/doctor_log');
                    return;
                }

                const userData = await GetUserData(token);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/doctor_log');
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/doctor_log');
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p>Welcome, {user.login}!</p>
            <p>Role: {user.role}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
