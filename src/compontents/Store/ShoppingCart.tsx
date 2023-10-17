import React, { ReactNode } from "react";
import {Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utillities/formatCurrency";
import { CartItem } from "./CartItem";
import storeItems from "../../data/items.json"

// ... (other imports and ShoppingCartProps definition remain unchanged)

type ShoppingCartProps = {
    isOpen: boolean;
    children?: ReactNode;
    onSubmitOrder: () => void; // Define a callback function for submitting the order
};

export function ShoppingCart({ isOpen, children, onSubmitOrder }: ShoppingCartProps) {
    const { closeCart, cartItems } = useShoppingCart();

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                        <CartItem key={item.id} id={item.id} quantity={item.quantity} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total{" "}
                        {formatCurrency(
                            cartItems.reduce((total, cartItem) => {
                                const item = storeItems.find(i => i.id === cartItem.id);
                                return total + Number(item?.price ?? 0) * cartItem.quantity;
                            }, 0)
                        )}
                    </div>
                    <div className="text-center mt-3">
                        <button className="btn btn-primary" onClick={onSubmitOrder}>
                            Submit Your Order
                        </button>
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
