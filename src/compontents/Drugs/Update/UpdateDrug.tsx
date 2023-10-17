import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { getAllDrugs, getDrugByName, updateDrug, Drug } from '../../../data/drugstore';

export function UpdateDrug() {
    const [selectedDrugName, setSelectedDrugName] = useState('');
    const [newDrugName, setNewDrugName] = useState('');
    const [newDrugPrice, setNewDrugPrice] = useState('');
    const [drug, setDrug] = useState<Drug | null>(null);
    const [drugsList, setDrugsList] = useState<Drug[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const drugs = await getAllDrugs();
                setDrugsList(drugs);
            } catch (error) {
                console.error(`Error fetching drugs: ${error}`);
            }
        };

        fetchData();
    }, []);

    const handleUpdate = async () => {
        if ((!drug || !newDrugName || !newDrugPrice) && !selectedDrugName) {
            alert('Please fill out all fields.');
            return;
        }

        try {
            const updatedDrug = {
                name: newDrugName || selectedDrugName,
                price: parseFloat(newDrugPrice),
            };

            const drugs = await getAllDrugs();
            const foundDrug = drugs.find((drug) => drug.name === selectedDrugName);
            if (foundDrug) {
                const updatedDrugResponse = await updateDrug(foundDrug.drug_id.toString(), updatedDrug);
                setDrug(updatedDrugResponse);
                alert('Drug updated successfully');
                // Optionally, you can reset the form fields here
            } else {
                alert('Drug not found');
            }
        } catch (error) {
            console.error(`Error updating drug: ${error}`);
        }
    };

    const handleDrugSelect = async () => {
        if (selectedDrugName) {
            try {
                const drugs = await getAllDrugs();
                const foundDrug: Drug | undefined = drugs.find((drug) => drug.name === selectedDrugName);
                setDrug(foundDrug || null); // Use null if foundDrug is undefined
            } catch (error) {
                console.error(`Error fetching drug: ${error}`);
                setDrug(null);
            }
        } else {
            setDrug(null);
        }
    };


    return (
        <Container className="mt-5">
            <Form className="d-flex flex-column align-items-center">
                <Form.Group className="mb-3" controlId="drugSelect">
                    <Form.Label>Choose or Enter Drug Name:</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedDrugName}
                        onChange={(e) => setSelectedDrugName(e.target.value)}
                    >
                        <option value="">-- Select Drug --</option>
                        {drugsList.map((drug) => (
                            <option key={drug.drug_id} value={drug.name}>
                                {drug.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="newDrugName">
                    <Form.Label>Enter New Drug Name (Optional):</Form.Label>
                    <Form.Control
                        type="text"
                        value={newDrugName}
                        onChange={(e) => setNewDrugName(e.target.value)}
                        placeholder="Enter new drug name"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="newDrugPrice">
                    <Form.Label>Enter New Drug Price (Optional):</Form.Label>
                    <Form.Control
                        type="number"
                        value={newDrugPrice}
                        onChange={(e) => setNewDrugPrice(e.target.value)}
                        placeholder="Enter new drug price"
                    />
                </Form.Group>
                <Button variant="success" onClick={handleUpdate}>
                    Update Drug
                </Button>
                <Button variant="primary" className="mt-2" onClick={handleDrugSelect}>
                    Search
                </Button>
                {drug && (
                    <div className="mt-3">
                        <h4>Drug Details:</h4>
                        <p>Name: {drug.name}</p>
                        <p>Price: {drug.price}</p>
                    </div>
                )}
            </Form>
        </Container>
    );
}
