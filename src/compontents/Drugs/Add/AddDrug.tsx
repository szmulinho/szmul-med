import React, { useState } from 'react';
import { Button, Container, TextField } from '@mui/material';
import { postDrug, Drug } from '../../../data/drugstore';
import { useNavigate } from 'react-router-dom';

export function AddDrug() {
    const [postData, setPostData] = useState<Drug>({
        drug_id: 0,
        name: '',
        price: 0,
        image: '',
        description: '',
    });

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await postDrug(postData);
    };

    return (
        <Container className="mt-auto d-flex flex-column align-items-center justify-content-center">
            <form onSubmit={handleSubmit} className="mt-auto d-flex flex-column align-items-center justify-content-center">
                <div>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={postData.name}
                        onChange={(event) => setPostData({ ...postData, name: event.target.value })}
                        margin="normal"
                    />
                </div>
                <div>
                    <TextField
                        label="Price"
                        variant="outlined"
                        type="number"
                        value={postData.price}
                        onChange={(event) => setPostData({ ...postData, price: parseFloat(event.target.value) || 0 })}

                        margin="normal"
                        InputProps={{ inputProps: { min: 0 } }}
                    />
                </div>
                <div>
                    <TextField
                        label="Image URL"
                        variant="outlined"
                        value={postData.image}
                        onChange={(event) => setPostData({ ...postData, image: event.target.value })}
                        margin="normal"
                    />
                </div>
                <div>
                    <TextField
                        label="Description"
                        variant="outlined"
                        value={postData.description}
                        onChange={(event) => setPostData({ ...postData, description: event.target.value })}
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
