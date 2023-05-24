import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { postPresc, CreatePrescInput } from '../../../data/prescription';
import { Drug, getDrug, getUsers, User } from '../../../data/drugstore';
import { AddDrug } from '../../Drugs/Add/AddDrug';
import { Image } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

export function AddPresc() {
    const [postData, setPostData] = useState<CreatePrescInput>({
        preid: 0,
        patient: '',
        drugs: [],
        expiration: '',
    });

    const [drugsData, setDrugsData] = useState<Drug[]>([]);
    const [patientsData, setPatientsData] = useState<User[]>([]);

    useEffect(() => {
        fetchData();
        fetchPatients();
    }, []);

    const fetchData = async () => {
        try {
            const result = await getDrug();
            console.log('rezultat', result);
            setDrugsData(result);
        } catch (error) {
            console.error('Error fetching drugs:', error);
        }
    };

    const fetchPatients = async () => {
        try {
            const patients = await getUsers();
            setPatientsData(patients);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const drugNames = drugsData.map((drug) => drug.name);

        const postDataToSend = {
            preid: postData.preid,
            patient: postData.patient,
            expiration: postData.expiration,
            drugs: postData.drugs.map((drug) => drug.name).join(','),
        };

        try {
            console.log('Data to send', postDataToSend);
            await postPresc(postDataToSend);
        } catch (error) {
            console.error('Error submitting prescription:', error);
        }
    };

    const handleDrugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const drugName = event.target.value;
        const drug = drugsData.find((drug) => drug.name === drugName);

        if (drug) {
            const isSelected = postData.drugs.some((selectedDrug) => selectedDrug.name === drug.name);

            if (isSelected) {
                const newSelectedDrugs = postData.drugs.filter((selectedDrug) => selectedDrug.name !== drug.name);
                setPostData({ ...postData, drugs: newSelectedDrugs });
            } else {
                const newSelectedDrugs = [...postData.drugs, drug];
                setPostData({ ...postData, drugs: newSelectedDrugs });
            }
        }
    };

    const handlePatientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = event.target.selectedIndex;
        const selectedPatient = patientsData[selectedIndex].login;
        setPostData({ ...postData, patient: selectedPatient });
    };

    return (
        <Container className="mt-auto d-flex flex-column align-items-center justify-content-center">
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div>
                    <label className="mt-auto d-flex flex-column align-items-center justify-content-center" htmlFor="patients">
                        Patient:
                    </label>
                    {patientsData.length > 0 ? (
                        <select
                            id="patients"
                            className="form-control"
                            style={{ width: '20rem', height: '2rem', fontSize: '1rem', color: 'grey' }}
                            value={postData.patient}
                            onChange={handlePatientChange}
                        >
                            {patientsData.map((patient, index) => (
                                <option key={index} value={patient.login}>
                                    {patient.login}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p>No patients found.</p>
                    )}
                </div>
                <div>
                    <label className="mt-auto d-flex flex-column align-items-center justify-content-center" htmlFor="drugs">
                        Drugs:
                    </label>
                    {drugsData.length > 0 ? (
                        <div style={{display: "flex", flexDirection: "column"}}>
                            {drugsData.map((drug, index) => (
                                <label key={index} style={{display: "flex", alignItems: "center", marginBottom: "0.5rem"}}>
                                    <input
                                        type="checkbox"
                                        value={drug.name}
                                        checked={postData.drugs.some((selectedDrug) => selectedDrug.name === drug.name)}
                                        onChange={handleDrugChange}
                                    />
                                    {drug.name} - {drug.price}
                                </label>
                            ))}
                        </div>
                    ) : (
                        <p>No drugs found.</p>
                    )}
                </div>
                <div className="form-group">
                    <label className="mt-auto d-flex flex-column align-items-center justify-content-center">Expiration:</label>
                    <input
                        type="date"
                        id="expiration"
                        className="form-control"
                        value={postData.expiration || ''}
                        onChange={(event) => setPostData({ ...postData, expiration: event.target.value })}
                    />
                </div>

                <Button variant="secondary" type="submit" className="rounded-3">
                    Submit
                </Button>
            </form>
        </Container>
    );
}
