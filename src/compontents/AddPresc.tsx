import { useState, useEffect } from 'react';
import {Button, Container} from 'react-bootstrap';
import { postPresc, CreatePrescInput, Drug, getDrug } from '../data/api';
import {AddDrug} from "./AddDrug";
import {Image} from "react-bootstrap";

export function AddPresc() {
    const [postData, setPostData] = useState<CreatePrescInput>({
        preid: '',
        drugs: [],
        expiration: '',
    });

    const [drugsData, setDrugsData] = useState<Drug[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getDrug();
            console.log(result);
            setDrugsData(result);
        };

        fetchData();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await postPresc(postData);
    };


    const handleDrugChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const drugId = event.target.value;
        const selectedDrugs = postData.drugs;
        const drugIndex = selectedDrugs.indexOf(drugId);
        const isSelected = drugIndex >= 0;

        if (isSelected) {
            // If the drug is already selected, remove it from the list
            selectedDrugs.splice(drugIndex, 1);
        } else {
            // If the drug is not yet selected, add it to the list
            selectedDrugs.push(drugId);
        }

        setPostData({ ...postData, drugs: selectedDrugs });
    };





    return (
        <Container className="mt-auto d-flex flex-column align-items-center justify-content-center">
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div className="form-group">
                    <label className="mt-auto d-flex flex-column align-items-center justify-content-center" htmlFor="preId">Prescription ID:</label>
                    <input
                        type="text"
                        id="preId"
                        className="form-control"
                        value={postData.preid || ''}
                        onChange={(event) =>
                            setPostData({ ...postData, preid: event.target.value })
                        }
                    />
                </div>
                <div>
                    <label className="mt-auto d-flex flex-column align-items-center justify-content-center" htmlFor="drugs">Drugs:</label>
                    <select
                        id="drugs"
                        className="form-control"
                        style={{ width: "20rem", height: "10rem", fontSize: "1rem", color: "grey" }}
                        multiple
                        value={postData.drugs}
                        onChange={handleDrugChange}
                    >
                        {drugsData.map((drug) => {
                            console.log(drug); // add this line to check the drug object
                            return (
                                <option key={drug.drugid}>
                                    {drug.name} - {drug.price}
                                </option>
                            );
                        })}
                    </select>

                </div>
                <div className="form-group">
                    <label className="mt-auto d-flex flex-column align-items-center justify-content-center">Expiration:</label>
                    <input
                        type="date"
                        id="expiration"
                        className="form-control"
                        value={postData.expiration || ''}
                        onChange={(event) =>
                            setPostData({ ...postData, expiration: event.target.value })
                        }
                    />
                </div>

                <Button variant="secondary" type="submit" className="rounded-3">Submit</Button>
            </form>
        </Container>
    );
}
