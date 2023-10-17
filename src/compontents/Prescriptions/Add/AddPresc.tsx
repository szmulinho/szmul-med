import React, { useState, useEffect } from 'react';
import { Button, Container, MenuItem, Select, TextField } from '@mui/material';
import { getAllDrugs, Drug } from '../../../data/drugstore';
import { Prescription, postPresc } from '../../../data/prescription';
import { getUsers, User } from '../../../data/users';

export function AddPresc() {
    const [postData, setPostData] = useState<Prescription>({
        pre_id: 0,
        patient: '',
        drugs: [],
        expiration: '',
    });
    const [patients, setPatients] = useState<User[]>([]);
    const [drugs, setDrugs] = useState<Drug[]>([]);

    useEffect(() => {
        // Fetch patients and drugs when the component mounts
        async function fetchData() {
            const patientsData = await getUsers();
            const drugsData = await getAllDrugs();
            setPatients(patientsData);
            setDrugs(drugsData);
        }
        fetchData();
    }, []); // Empty dependency array ensures this effect runs once after initial render

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Call your API function to post the prescription data
        await postPresc(postData);

    };

    return (
        <Container className="mt-auto d-flex flex-column align-items-center justify-content-center">
            <form onSubmit={handleSubmit} className="mt-auto d-flex flex-column align-items-center justify-content-center">
                <div>
                    <Select
                        label="Patient"
                        value={postData.patient}
                        onChange={(event) => setPostData({ ...postData, patient: event.target.value as string })}
                        variant="outlined"
                        margin="dense"
                    >
                        {patients.map((patient) => (
                            <MenuItem key={patient.id} value={patient.login}>
                                {patient.login}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div>
                    <Select
                        label="Drugs"
                        value={postData.drugs} // Value is now an array
                        onChange={(event) => setPostData({ ...postData, drugs: event.target.value as string[] })}
                        variant="outlined"
                        margin="dense"
                        multiple // Allow multiple selections
                    >
                        {drugs.map((drug) => (
                            <MenuItem key={drug.drug_id} value={drug.name}>
                                {drug.name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>

                <div>
                    <TextField
                        label="Expiration"
                        variant="outlined"
                        type="date"
                        value={postData.expiration}
                        onChange={(event) => setPostData({ ...postData, expiration: event.target.value })}
                        margin="normal"
                    />
                </div>
                <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }}>
                    Submit
                </Button>
            </form>
        </Container>
    );
}