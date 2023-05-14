import { useState, useEffect } from 'react';
import {Button, Container} from 'react-bootstrap';
import { postPresc, CreatePrescInput } from '../../../data/prescription';
import { Drug , getDrug } from '../../../data/drugstore';
import {AddDrug} from "../../Drugs/Add/AddDrug";
import {Image} from "react-bootstrap";

export function AddPresc() {

    const [postData, setPostData] = useState<CreatePrescInput>({
        preid: 0,
        drugs: [],
        expiration: '',
    });

    const [drugsData, setDrugsData] = useState<Drug[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getDrug();
            setDrugsData(result);
        };

        fetchData();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const drugs = postData.drugs.map((drug) => drug.name);

        const postDataToSend = {
            preid: postData.preid,
            expiration: postData.expiration,
            drugs: postData.drugs,
        };

        await postPresc(postDataToSend);

    }


    const handleDrugChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const drugName = event.target.value;
        const drug = drugsData.find((drug) => drug.name === drugName);

        if (drug) {
            const newSelectedDrugs = postData.drugs.concat({ name: drug.name, price: drug.price });
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
                    {drugsData && drugsData.length > 0 ? (
                        <select
                            id="drugs"
                            className="form-control"
                            style={{ width: '20rem', height: '10rem', fontSize: '1rem', color: 'grey' }}
                            multiple
                            value={postData.drugs.map((drug) => drug.name)}
                            onChange={handleDrugChange}
                        >
                            {drugsData.map((drug) => (
                                <option key={drug.name} value={drug.name}>
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