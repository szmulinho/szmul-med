import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleCallback } from "../../data/github";

export const GithubProfile: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await handleCallback();
                setUserData(response);
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/error');
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div>
            <h2>User Profile</h2>
            {userData ? (
                <div>
                    <img src={userData.avatar_url} alt="User Avatar"/>
                    <h3>{userData.login}</h3>
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
