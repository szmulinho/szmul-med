import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext, UserContextProps } from "../../context/UserContext";
import { GetPatientPresc, Prescription } from "../../data/prescription"; // Assume API functions are imported from the correct path
import { Modal, Button } from 'react-bootstrap';
import {GithubUserContext, GithubUserContextProps} from "../../context/GithubUserContext";

export function CuProfile() {
    const navigate = useNavigate();
    const { user, setUser, logout } = useContext(UserContext) as UserContextProps;
    const { githubUser, setGithubUser } = useContext(GithubUserContext) as GithubUserContextProps;
    const [prescription, setPrescription] = useState<Prescription | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Sprawdź czy zarówno user, jak i githubUser istnieją, jeśli nie, przekieruj użytkownika na inną stronę
        if (!user || !githubUser) {
            navigate('/login'); // Przekieruj na stronę logowania
        }
    }, [user, githubUser, navigate]);

    const handleShowPrescriptions = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token || !user) {
                console.error("Token or user not available");
                navigate('/login');
                return;
            }

            console.log("Fetching prescription for user:", user.login);
            const fetchedPrescription = await GetPatientPresc(user.login);
            console.log("Fetched prescription data:", fetchedPrescription);

            setPrescription(fetchedPrescription);
            setShowResult(true);
        } catch (error) {
            console.error('Error fetching patient prescription:', error);
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };


    const handleResultClose = () => {
        setShowResult(false);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };


    return (
        <div>
            <h2>User Profile</h2>
            <p>Welcome, {user ? user.login : 'Guest'}!</p>


            <Button variant="secondary" onClick={handleShowPrescriptions}>Show my prescriptions</Button>

            <Modal show={showResult} onHide={handleResultClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Prescription</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <p>Loading prescription data...</p>
                    ) : prescription ? (
                        <div>
                            <pre>{JSON.stringify(prescription, null, 2)}</pre>
                        </div>
                    ) : (
                        <p>No prescription found for {user ? user.login : 'Guest'}.</p>
                    )}
                </Modal.Body>



                <Modal.Footer>
                    <Button variant="secondary" onClick={handleResultClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
