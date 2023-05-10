import { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { deleteDrug } from '../data/drugstore';
import { CreatePrescInput, deletePresc, getPresc } from '../data/prescription';

export function DeletePresc() {
    const [prescId, setPrescId] = useState('');
    const [prescs, setPrescs] = useState<CreatePrescInput[] | null>(null);


    useEffect(() => {
        const fetchPrescs = async () => {
            const fetchedPrescs = await getPresc();
            setPrescs(fetchedPrescs);
        };
        fetchPrescs();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (prescId) {
            const confirmed = window.confirm('Are you sure you want to delete this drug?');
            if (confirmed) {
                await deleteDrug(prescId);
                alert('Prescription deleted successfully');
                window.location.reload();
            }
        }
    };

    return (
        <Container className="mt-5">
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div className="form-group">
                    <label htmlFor="prescId">Select Prescription:</label>
                    {prescs === null ? (
                        <p>No prescriptions available</p>
                    ) : (
                        <select
                            id="prescId"
                            className="form-control"
                            value={prescId}
                            onChange={(event) => setPrescId(event.target.value)}
                        >
                            <option value="">-- Select a Prescription --</option>
                            {prescs.map((presc) => (
                                <option key={presc.preid} value={presc.preid}>
                                    {presc.preid} - {presc.drugs} - {presc.expiration}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <Button variant="danger" type="submit" className="mt-3">
                    Delete Prescription
                </Button>
            </form>
        </Container>
    );
}
