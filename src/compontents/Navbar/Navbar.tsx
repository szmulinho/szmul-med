import {Container, Nav, Button, Navbar as NavbarBs} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import ReactComponent from "./images/shopping-cart.svg"

export function Navbar() {
    return <NavbarBs className="bg-white shadow-lg mb-3">
        <Container>
            <Nav className="me-auto">
                <Nav.Link to={"/"} as={NavLink}>
                    Home
                </Nav.Link>
                <Nav.Link to={"/clinic"} as={NavLink}>
                    Clinic
                </Nav.Link>
                <Nav.Link to={"/pharmacy"} as={NavLink}>
                    Pharmacy
                </Nav.Link>
            </Nav>
            <Button style={{width: "3rem", height: "3rem"}}
            className="rounded-circle">
                <svg>
                </svg>
            </Button>
        </Container>
    </NavbarBs>
}