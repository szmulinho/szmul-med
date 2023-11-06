import React, { ReactNode } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { Drug } from "../../data/drugstore"; // Import the Drug type
import { formatCurrency } from "../../utillities/formatCurrency";

type ShoppingCartProps = {
    isOpen: boolean;
    children?: ReactNode;
    onSubmitOrder: () => void; // Define a callback function for submitting the order
    drugs: Drug[]; // Pass the drugs array as a prop
};

export function ShoppingCart({ isOpen, children, onSubmitOrder, drugs }: ShoppingCartProps) {
    const { closeCart, drugItems } = useShoppingCart();

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {drugItems.map(cartItem => {
                        const drug = drugs.find(d => d.drug_id === cartItem.drug.drug_id);
                        if (!drug) return null;
                        return <CartItem key={drug.drug_id} drug={drug} quantity={cartItem.quantity} />;
                    })}
                    <div className="ms-auto fw-bold fs-5">
                        Total{" "}
                        {formatCurrency(
                            drugItems.reduce((total, cartItem) => {
                                const drug = drugs.find(d => d.drug_id === cartItem.drug.drug_id);
                                return total + Number(drug?.price ?? 0) * cartItem.quantity;
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
