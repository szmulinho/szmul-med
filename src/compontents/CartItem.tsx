import {useShoppingCart} from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import {teal} from "@mui/material/colors";
import {Button, Stack} from "react-bootstrap";
import {formatCurrency} from "../utillities/formatCurrency";

type CartItemProps = {
    id: number
    quantity: number
}

export function CartItem({id, quantity}: CartItemProps) {
    const { removeFromCart } = useShoppingCart()
    const item = storeItems.find(i => i.id === id)
    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={item.imgUrl} style={{width: "125px", height: "72px", objectFit:"cover"}} />
            <div className="me-auto">
                <div>
                    {item.name} {quantity > 1 && <span className="text-muted" style={{fontSize: ".75rem"}}>x{quantity}</span>}
                </div>
                <div className="text-muted" style={{fontSize: ".75rem"}}>
                    {formatCurrency(Number(item.price))}



                </div>
            </div>
            <div> {formatCurrency(Number(item.price) * Number(quantity))}
                <Button variant="outline-danger" size="sm" onClick={()=> removeFromCart(item.id)}>&times;</Button>
            </div>
        </Stack>
    )
}