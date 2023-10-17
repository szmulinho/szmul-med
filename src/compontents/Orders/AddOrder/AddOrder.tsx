import React, {useContext, useState } from 'react';
import { Button, Container, TextField } from '@mui/material';
import { postOrder, Order } from '../../../data/orders';
import { UserContext } from '../../../context/UserContext';

export function AddOrder() {
    const { user } = useContext(UserContext); // Access the user object from the UserContext
    const [postData, setPostData] = useState<Order>({
        id: 0,
        name: user ? user.login : '', // Set the name field to the logged-in user's login
        email: '',
        address: '',
        items: '',
        price: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        await postOrder(postData);
    };

    return (
        <Container className="mt-auto d-flex flex-column align-items-center justify-content-center">
            <form
                onSubmit={handleSubmit}
                className="mt-auto d-flex flex-column align-items-center justify-content-center"
            >
                <TextField
                    label="Name"
                    variant="outlined"
                    value={postData.name}
                    onChange={(event) => setPostData({ ...postData, name: event.target.value })}
                    margin="normal"
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={postData.email}
                    onChange={(event) => setPostData({ ...postData, email: event.target.value })}
                    margin="normal"
                />
                <TextField
                    label="Address"
                    variant="outlined"
                    value={postData.address}
                    onChange={(event) => setPostData({ ...postData, address: event.target.value })}
                    margin="normal"
                />
                <TextField
                    label="Items"
                    variant="outlined"
                    value={postData.items}
                    onChange={(event) => setPostData({ ...postData, items: event.target.value })}
                    margin="normal"
                />
                <TextField
                    label="Price"
                    variant="outlined"
                    value={postData.price}
                    onChange={(event) => setPostData({ ...postData, price: event.target.value })}
                    margin="normal"
                />
                <Button variant="contained" color="primary" type="submit" style={{ marginTop: 16 }}>
                    Submit
                </Button>
            </form>
        </Container>
    );
}
