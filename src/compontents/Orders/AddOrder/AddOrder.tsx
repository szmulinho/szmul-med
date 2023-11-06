import React, {useContext, useEffect, useState } from 'react';
import { Button, Container, TextField } from '@mui/material';
import { postOrder, Order } from '../../../data/orders';
import {UserContext, UserContextProps} from '../../../context/UserContext';
import {useLocation, useNavigate } from 'react-router-dom';

export function AddOrder() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(UserContext) as UserContextProps;
    const [postData, setPostData] = useState<Order>({
        id: 0,
        name: user?.login || '',
        email: user?.email || '',
        address: '',
        items: '',
        price: '',
    });

    useEffect(() => {
        if (location.state) {
            const { items, price } = location.state;
            setPostData({ ...postData, items, price });
        }
    }, [location.state]);

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        await postOrder(postData);
        navigate("/opinion")
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
