import {Container, Nav, Button, Navbar as NavbarPc, Row, Col} from "react-bootstrap"
import storeItems from "../data/items.json"
import {StoreItem} from "../compontents/StoreItem";

export function Pharmacy() {
    return <h1 style={{position: "relative"}}>
        Pharmacy
        <NavbarPc>
            <Button style={{width: "3rem", height: "3rem", position: "relative", left: 1255, bottom: 58}}
                    variant="outline-primary"
                    className="rounded-circle">
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="cart"><path d="M8.5,19A1.5,1.5,0,1,0,10,20.5,1.5,1.5,0,0,0,8.5,19ZM19,16H7a1,1,0,0,1,0-2h8.49121A3.0132,3.0132,0,0,0,18.376,11.82422L19.96143,6.2749A1.00009,1.00009,0,0,0,19,5H6.73907A3.00666,3.00666,0,0,0,3.92139,3H3A1,1,0,0,0,3,5h.92139a1.00459,1.00459,0,0,1,.96142.7251l.15552.54474.00024.00506L6.6792,12.01709A3.00006,3.00006,0,0,0,7,18H19a1,1,0,0,0,0-2ZM17.67432,7l-1.2212,4.27441A1.00458,1.00458,0,0,1,15.49121,12H8.75439l-.25494-.89221L7.32642,7ZM16.5,19A1.5,1.5,0,1,0,18,20.5,1.5,1.5,0,0,0,16.5,19Z"></path></svg>
                <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                     style={{color: "white", width: "1.5rem", height: "1.5rem", position: "absolute", bottom: 0, right: 0, transform: "translate(25%, 25%)"}}>
                    3
                </div>
            </Button>

        <Container>
        </Container>
        </NavbarPc>
        <Row md={2} xs={1} lg={4} className="g-3">
            {storeItems.map(item => (
                    <Col key={item.id}><StoreItem {...item}/> </Col>

                )
            )}
        </Row>

    </h1>

}