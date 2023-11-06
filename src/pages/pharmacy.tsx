import {Container, Nav, Button, Navbar as NavbarPc, Row, Col, InputGroup, Form} from "react-bootstrap"
import {StoreItem} from "../compontents/Store/StoreItem";
import {useShoppingCart} from "../context/ShoppingCartContext";
import {useEffect, useState } from "react";
import {Drug, getAllDrugs} from "../data/drugstore";


export function Pharmacy() {
    const { openCart, cartQuantity } = useShoppingCart()
    const [drugs, setDrugs] = useState<Drug[]>([]);

    useEffect(() => {
        async function fetchDrugs() {
            try {
                const response = await getAllDrugs();
                setDrugs(response);
            } catch (error) {
                console.error('Error fetching drugs:', error);
            }
        }
        fetchDrugs();
    }, []);


    return <h1 style={{position: "relative"}}>
        Pharmacy
        <NavbarPc>
           <Container className="position-relative">
               <InputGroup className="mb-4 justify-content-center" style={{position: "absolute", width: 600, left: 338, bottom: 0}}>
                   <Button variant="outline-secondary" id="button-addon1">
                       Search
                   </Button>
                   <Form.Control
                       aria-label="Example text with button addon"
                       aria-describedby="basic-addon1"
                   />
               </InputGroup>
           </Container>
            <Button onClick={openCart} style={{width: "3rem", height: "3rem", position: "relative", bottom: 50, right: -650}}
                    variant="outline-info"
                    className="rounded-circle">
                <svg style={{width: "1.8rem", height: "1.8rem", position: "relative", right: 3, top: 3,}} xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="cart"><path d="M8.5,19A1.5,1.5,0,1,0,10,20.5,1.5,1.5,0,0,0,8.5,19ZM19,16H7a1,1,0,0,1,0-2h8.49121A3.0132,3.0132,0,0,0,18.376,11.82422L19.96143,6.2749A1.00009,1.00009,0,0,0,19,5H6.73907A3.00666,3.00666,0,0,0,3.92139,3H3A1,1,0,0,0,3,5h.92139a1.00459,1.00459,0,0,1,.96142.7251l.15552.54474.00024.00506L6.6792,12.01709A3.00006,3.00006,0,0,0,7,18H19a1,1,0,0,0,0-2ZM17.67432,7l-1.2212,4.27441A1.00458,1.00458,0,0,1,15.49121,12H8.75439l-.25494-.89221L7.32642,7ZM16.5,19A1.5,1.5,0,1,0,18,20.5,1.5,1.5,0,0,0,16.5,19Z"></path></svg>
                <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                     style={{color: "white", width: "1.5rem", height: "1.5rem", position: "relative", transform: "translate(45%, -10%)"}}>
                    {cartQuantity}
                </div>
            </Button>

        <Container>
        </Container>
        </NavbarPc>
        <Row md={2} xs={1} lg={4} className="g-3">
            {drugs.map(drug => (
                <Col key={drug.drug_id}>
                    <StoreItem
                        drug_id={drug.drug_id}
                        name={drug.name}
                        price={drug.price}
                        image={drug.image}
                    />
                </Col>
            ))}
        </Row>
    </h1>

}