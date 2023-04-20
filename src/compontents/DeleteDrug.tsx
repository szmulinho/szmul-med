import { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { deleteDrug, getDrug } from '../data/api';
import { Drug } from '../data/api';

export function DeleteDrug() {
    const [drugId, setDrugId] = useState('');
    const [drugs, setDrugs] = useState<Drug[] | null>(null);

    useEffect(() => {
        const fetchDrugs = async () => {
            const fetchedPrescs = await getDrug();
            setDrugs(fetchedPrescs);
        };
        fetchDrugs();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (drugId) {
            const confirmed = window.confirm('Are you sure you want to delete this drug?');
            if (confirmed) {
                await deleteDrug(drugId);
                alert('Drug deleted successfully');
                window.location.reload();
            }
        }
    };


    return (
        <Container className="mt-5">
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div className="form-group">
                    <label className="d-flex flex-column align-items-center" htmlFor="drugId">Select drugs:</label>
                    {drugs === null ? (
                        <p>No drugs avalible</p>
                        ) : (
                    <select
                        id="drugId"
                        className="form-control"
                        value={drugId}
                        onChange={(event) => setDrugId(event.target.value)}
                    >
                        <option value="">-- Select a Prescription --</option>
                        {drugs.map((drug) => (
                            <option key={drug.drugid} value={drug.drugid}>
                                {drug.drugid} - {drug.name} - {drug.price}
                            </option>
                        ))}
                    </select>
                        )}
                </div>
                <Button variant="danger" type="submit" className="mt-3">
                    Delete drug
                </Button>
            </form>
        </Container>
    );
}
