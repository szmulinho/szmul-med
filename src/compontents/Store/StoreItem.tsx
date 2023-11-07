import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { Drug } from '../../data/drugstore';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utillities/formatCurrency';

interface StoreItemProps {
    drug_id: number;
    name: string;
    price: number;
    image: string;
}

export function StoreItem({ drug_id, name, price, image }: StoreItemProps): JSX.Element {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
    const quantity = getItemQuantity(drug_id);

    const encodedName = encodeURIComponent(name); // Encode the name for the URL

    return (
        <Card className="h-75">
            <Link to={`/drug/${encodedName}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card.Img variant="top" src={image} height="220px" style={{ objectFit: 'scale-down' }} />
            </Link>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-4">{name}</span>
                    <span className="fs-4">{formatCurrency(price)}</span>
                </Card.Title>
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button className="w-100" onClick={() => increaseCartQuantity(drug_id)}>
                            + Add to cart
                        </Button>
                    ) : (
                        <div className="d-flex align-items-center flex-column" style={{ gap: '.5rem' }}>
                            <div className="d-flex align-items-center justify-content-center" style={{ gap: '.5rem' }}>
                                <Button onClick={() => decreaseCartQuantity(drug_id)}>-</Button>
                                <div>
                                    <span className="fs-1">{quantity}</span>
                                    in cart
                                </div>
                                <Button onClick={() => increaseCartQuantity(drug_id)}>+</Button>
                            </div>
                            <Button onClick={() => removeFromCart(drug_id)} variant="danger" size="sm">
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}
