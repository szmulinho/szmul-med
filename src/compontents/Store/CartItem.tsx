import React from 'react';
import { Button } from 'react-bootstrap';
import { Drug } from '../../data/drugstore';
import { useShoppingCart } from '../../context/ShoppingCartContext';

type CartItemProps = {
    drug: Drug;
    quantity: number;
};

export function CartItem({ drug, quantity }: CartItemProps): JSX.Element {
    const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();

    return (
        <div className="d-flex justify-content-between align-items-center">
            <div>
                <span className="fw-bold">{drug.name}</span> - Quantity: {quantity}
            </div>
            <div>
                <Button variant="outline-primary" onClick={() => increaseCartQuantity(drug.drug_id)}>
                    +
                </Button>{' '}
                <Button variant="outline-primary" onClick={() => decreaseCartQuantity(drug.drug_id)}>
                    -
                </Button>{' '}
                <Button variant="outline-danger" onClick={() => removeFromCart(drug.drug_id)}>
                    Remove
                </Button>
            </div>
        </div>
    );
}
