import {Offcanvas, Stack} from "react-bootstrap";
import {useShoppingCart} from "../../context/ShoppingCartContext";
import {CartItem} from "./CartItem";
import {formatCurrency} from "../../utillities/formatCurrency";
import storeItems from "../../data/items.json"
import {ReactNode} from "react";

type ShoppingCartProps = {
    isOpen: boolean
    children?: ReactNode
}

export function ShoppingCart({ isOpen, children }: ShoppingCartProps) {
    const {closeCart, cartItems} = useShoppingCart()
     return <Offcanvas show ={isOpen} onHide={closeCart} placement="end">
         <Offcanvas.Header closeButton>
             <Offcanvas.Title>

             </Offcanvas.Title>
             Cart
         </Offcanvas.Header>
         <Offcanvas.Body>
             <Stack gap={3}>
                 {cartItems.map(item => (
                     <CartItem key={item.id} id={item.id} quantity={item.quantity} />

                 ))}

                 <div className="ms-auto fw-bold fs-5">
                     Total {formatCurrency(cartItems.reduce((total, cartItem) => {
                         const item = storeItems.find(i => i.id === cartItem.id)
                         return total + Number(item?.price ?? 0) * cartItem.quantity;

                     }, 0)
                 )}
                 </div>
             </Stack>
         </Offcanvas.Body>

     </Offcanvas>
}