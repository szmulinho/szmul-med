import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GithubUser } from '../../data/github';
import { handleCallback } from "../../data/github";

export const GithubProfile: React.FC = () => {
    const [userData, setUserData] = useState<GithubUser | null>(null);
    const [code, setCode] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null); // Dodaj nowy stan do przechowywania błędu

    const navigate = useNavigate();

    useEffect(() => {
        setCode(localStorage.getItem('githubCode'));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await handleCallback(code ?? undefined);
                if (userData) {
                    setUserData(userData);
                } else {
                    setError('User data is empty.'); // Ustaw błąd, jeśli dane użytkownika są puste
                    navigate('/error');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data: ' + error.message); // Ustaw błąd na podstawie komunikatu błędu
                navigate('/error');
            }
        };

        fetchData();
    }, [code, navigate]);

    return (
        <div>
            <h2>User Profile</h2>
            {error ? (
                <div>Error: {error}</div> // Pokaż błąd, jeśli istnieje
            ) : userData ? (
                <div>
                    <h3>{userData.username}</h3>
                    <h3>{userData.email}</h3>
                    <h3>{userData.role}</h3>
                </div>
            ) : (
                <div>Loading user data...</div>
            )}
        </div>
    );
};

export default GithubProfile;
