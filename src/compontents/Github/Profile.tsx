import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GithubUser } from '../../data/github';
import { handleCallback } from "../../data/github";

export const GithubProfile: React.FC = () => {
    const [userData, setUserData] = useState<GithubUser | null>(null);
    const [code, setCode] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        setCode(localStorage.getItem('githubCode'));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('githubAccessToken');
                const response = await fetch('https://api.github.com/user', {
                    headers: {
                        'Authorization': `token ${token}`,
                    },
                });
                const userData = await response.json();
                if (userData) {
                    setUserData(userData);
                } else {
                    navigate('/error');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/error');
            }
        };



        fetchData();
    }, [code, navigate]);

    return (
        <div>
            <h2>User Profile</h2>
            {userData ? (
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
