import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Drug } from '../../data/drugstore';
import { SelectChangeEvent } from '@mui/material/Select';
import {useShoppingCart} from "../../context/ShoppingCartContext";

interface RouteParams {
    name: string;
    [key: string]: string | undefined;
}

export function CirrusProfile(): JSX.Element {
    const { name } = useParams<RouteParams>();
    const [drug, setDrug] = useState<Drug | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const { increaseCartQuantity } = useShoppingCart();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://szmul-med-drugstore.onrender.com/drugs/7`);
                setDrug(response.data);
            } catch (error) {
                console.error(`Error fetching drug data: ${error}`);
            }
        };

        fetchData();
    }, [name]);

    const handleQuantityChange = (event: SelectChangeEvent<number>) => {
        if (typeof event.target.value === 'number') {
            setQuantity(event.target.value);
        }
    };

    const handleAddToCart = () => {
        if (drug) {
            increaseCartQuantity(drug.drug_id);
        }
    };


    return (
        <div>
            {drug ? (
                <div>
                    <Typography variant="h4">{drug.name}</Typography>
                    <img src={drug.image} alt={drug.name} style={{ maxWidth: '100%', marginTop: '20px' }} />
                    <Typography variant="h6" style={{ marginTop: '10px' }}>
                        Price: {drug.price} ZŁ
                    </Typography>
                    <Typography variant="body1" style={{ marginTop: '10px', textAlign: 'justify' }}>
                        <strong>Description:</strong> {drug.description}
                    </Typography>
                    <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                </div>
            ) : (
                <Typography variant="h6">Loading...</Typography>
            )}
        </div>
    );
}