import { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { deleteDrug, getDrug, updateDrug, Drug } from '../data/drugstore';

export function UpdateDrug() {
    const [drugId, setDrugId] = useState('');
    const [drugs, setDrugs] = useState<Drug[] | null>(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        const fetchDrugs = async () => {
            const fetchedDrugs = await getDrug();
            setDrugs(fetchedDrugs);
        };
        fetchDrugs();
    }, []);

    const handleUpdate = async () => {
        if (!drugId) return;
        await updateDrug(drugId, { name, price: price.toString() });
        alert('Drug updated successfully');
        window.location.reload();
    };


    const handleSelect = (event: React.FormEvent<HTMLSelectElement>) => {
        const selectedDrug = drugs.find((drug) => drug.drugid === event.currentTarget.value);
        if (selectedDrug) {
            setDrugId(selectedDrug.drugid);
            setName(selectedDrug.name);
            setPrice(selectedDrug.price.toString());
        }
    };

    return (
        <Container className="mt-5">
            {drugs === null ?
                <div>No drugs available</div> :
                <form onSubmit={handleUpdate} className="d-flex flex-column align-items-center">
                    <div className="form-group">
                        <label className="d-flex flex-column align-items-center" htmlFor="drugId">Select drug:</label>
                        <select  id="drugId" className="form-control" value={drugId} onChange={handleSelect}>
                            <option value="">-- Select drug --</option>
                            {drugs.map((drug) => (
                                <option key={drug.drugid} value={drug.drugid}>
                                    {drug.drugid} - {drug.name} - {drug.price}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="d-flex flex-column align-items-center" htmlFor="name">Drug Name:</label>
                        <input type="text" id="name" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="d-flex flex-column align-items-center" htmlFor="price">Drug Price:</label>
                        <input
                            type="text"
                            id="price"
                            className="form-control"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                        />
                    </div>
                    <Button variant="outline-success" type="submit" className="mt-3">
                        Update Drug
                    </Button>
                </form>
            }
        </Container>
    )};
