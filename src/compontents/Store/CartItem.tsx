import {useShoppingCart} from "../../context/ShoppingCartContext";
import {teal} from "@mui/material/colors";
import {Button, Stack} from "react-bootstrap";
import {formatCurrency} from "../../utillities/formatCurrency";
import {Drug} from "../../data/drugstore";

type CartItemProps = {
    drug: Drug
    quantity: number
};

export function CartItem({drug, quantity}: CartItemProps) {
    const { removeFromCart } = useShoppingCart()

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={drug.image} style={{width: "125px", height: "72px", objectFit:"cover"}} />
            <div className="me-auto">
                <div>
                    {drug.name} {quantity > 1 && <span className="text-muted" style={{fontSize: ".75rem"}}>x{quantity}</span>}
                </div>
                <div className="text-muted" style={{fontSize: ".75rem"}}>
                    {formatCurrency(Number(drug.price))}



                </div>
            </div>
            <div> {formatCurrency(Number(drug.price) * Number(quantity))}
                <Button variant="outline-danger" size="sm" onClick={()=> removeFromCart(drug.drug_id)}>&times;</Button>
            </div>
        </Stack>
    )
}