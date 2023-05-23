import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { postPresc, CreatePrescInput } from '../../../data/prescription';
import { Drug, getDrug } from '../../../data/drugstore';
import { AddDrug } from '../../Drugs/Add/AddDrug';
import { Image } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

export function AddPresc() {
    const [postData, setPostData] = useState<CreatePrescInput>({
        preid: 0,
        drugs: [],
        expiration: '',
    });

    const [drugsData, setDrugsData] = useState<Drug[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await getDrug();
            console.log("rezultat", result)
            setDrugsData(result);
        } catch (error) {
            console.error('Error fetching drugs:', error);
        }
    };

    console.log('drugsData:', drugsData);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const drugNames = drugsData.map((drug) => drug.name);



        const postDataToSend = {
            preid: postData.preid,
            expiration: postData.expiration,
            drugs: postData.drugs.join(`,`),
        };




        try {
            console.log("Data to send", postDataToSend)
            await postPresc(postDataToSend);
        } catch (error) {
            console.error('Error submitting prescription:', error);
        }
    };

    const handleDrugChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const drugName = event.target.value;
        const drug = drugsData.find((drug) => drug.name === drugName);

        if (drug) {
            const newSelectedDrugs = [...postData.drugs, drug.name];
            setPostData({ ...postData, drugs: newSelectedDrugs });
        }
    };


    return (
        <Container className="mt-auto d-flex flex-column align-items-center justify-content-center">
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div>
                    <label className="mt-auto d-flex flex-column align-items-center justify-content-center" htmlFor="drugs">
                        Drugs:
                    </label>
                    {drugsData.length > 0 ? (
                        <select
                            id="drugs"
                            className="form-control"
                            style={{ width: '20rem', height: '10rem', fontSize: '1rem', color: 'grey' }}
                            multiple
                            value={postData.drugs.map((drug) => drug.name)}
                            onChange={handleDrugChange}
                        >
                            {drugsData.map((drug, index) => (
                                <option key={index} value={drug.name}>
                                    {drug.name} - {drug.price}
                                </option>
                            ))}
                        </select>
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
