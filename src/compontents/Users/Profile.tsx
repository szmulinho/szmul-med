import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetUserData, User, GetPrescriptionsByUser } from '../../data/prescription';
import { UserContext, UserContextProps } from "../../context/UserContext";
import { GetCustomerData } from "../../data/drugstore";

export function CuProfile() {
    const navigate = useNavigate();
    const { user, setUser, logout } = useContext(UserContext) as UserContextProps;
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const userData = await GetCustomerData(token);
                setUser(userData);

                if (userData && userData.id) {
                    const userPrescriptions = await GetPrescriptionsByUser(userData.id);
                    setPrescriptions(userPrescriptions);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login');
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p>Welcome, {user.login}!</p>
            <p>Role: {user.role}</p>

            <h3>Prescriptions:</h3>
            {prescriptions.length > 0 ? (
                <ul>
                    {prescriptions.map((prescription) => (
                        <li key={prescription.id}>
                            Prescription ID: {prescription.id}, Expiration: {prescription.expiration}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No prescriptions found.</p>
            )}

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
