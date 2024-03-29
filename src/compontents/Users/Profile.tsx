import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext, UserContextProps } from "../../context/UserContext";
import { GetPatientPresc, Prescription } from "../../data/prescription"; // Assume API functions are imported from the correct path
import { Modal, Button } from 'react-bootstrap';
import {GetOrderByName, Order} from "../../data/orders";
import {GitHubUserContext, GitHubUserContextProps} from "../../context/Github";

export function CuProfile() {
    const navigate = useNavigate();
    const { user, setUser, logout } = useContext(UserContext) as UserContextProps;
    const { githubUser, setGithubUser } = useContext(GitHubUserContext) as GitHubUserContextProps;
    const [prescription, setPrescription] = useState<Prescription | null>(null);
    const [order, setOrder] = useState<Order | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [showResult2, setShowResult2] = useState(false);
    const [loading, setLoading] = useState(false);

    if (user === null || user === undefined || githubUser === null || githubUser === undefined) {
        navigate('/login');
        return null;
    }

    const handleShowPrescriptions = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token || !user || !githubUser) {
                console.error("Token or user not available");
                navigate('/login');
                return;
            }

            console.log("Fetching prescription for user:", user.login || githubUser.login);
            const fetchedPrescription = await GetPatientPresc(user.login || githubUser.login);
            console.log("Fetched prescription data:", fetchedPrescription);

            setPrescription(fetchedPrescription);
            setShowResult2(true);
        } catch (error) {
            console.error('Error fetching patient prescription:', error);
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    const handleShowOrders = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Token not available");
                return;
            }

            console.log("Fetching orders for user:", user.login);
            const fetchedOrder = await GetOrderByName(user.login || githubUser.login);
            console.log("Fetched orders data:", fetchedOrder);

            setOrder(fetchedOrder);
            setShowResult(true);
        } catch (error) {
            console.error('Error fetching patient orders:', error);
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };




    const handleResultClose = () => {
        setShowResult(false);
        setShowResult2(false);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };


    return (
        <div>
            <h2>User Profile</h2>
            <p>Welcome, {user.login || githubUser?.login}!</p>

            <Button variant="secondary" onClick={handleShowPrescriptions}>Show my prescriptions</Button>

            <Modal show={showResult2} onHide={handleResultClose}>
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
                        <p>No prescription found for {user.login || githubUser?.login}.</p>
                    )}
                </Modal.Body>



                <Modal.Footer>
                    <Button variant="secondary" onClick={handleResultClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Button variant="secondary" onClick={handleShowOrders}>Show my orders</Button>

            <Modal show={showResult} onHide={handleResultClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Orders</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <p>Loading orders data...</p>
                    ) : order ? (
                        <div>
                            <pre>{JSON.stringify(order, null, 2)}</pre>
                        </div>
                    ) : (
                        <p>No orders found for {user.login || githubUser?.login}.</p>
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
