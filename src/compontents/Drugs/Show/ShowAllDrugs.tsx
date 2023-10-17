import { getAllDrugs, Drug } from '../../../data/drugstore';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export const ShowAllDrugs = () => {
    const [posts, setPosts] = useState<Drug[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState('');

    const handleClick = async () => {
        const data = await getAllDrugs();
        setPosts(data);
        setShowResult(true);
    };

    const handleResultClose = () => {
        setShowResult(false);
    };

    return (
        <h1 className="mt-auto d-flex flex-column align-items-center justify-content-center">
            <Button variant="secondary" onClick={handleClick}>Show all drugs</Button>
    <Modal show={showResult} onHide={handleResultClose}>
    <Modal.Header closeButton>
    <Modal.Title>Result</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <pre>{JSON.stringify(posts, null, 2)}</pre>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="secondary" onClick={handleResultClose}>
        Close
        </Button>
        </Modal.Footer>
        </Modal>
        </h1>
);
};