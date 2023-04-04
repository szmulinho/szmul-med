import {Container, Nav, Button, Navbar as NavbarBs, Image} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import myLogo from "./images/logo.png"

export function Navbar() {
    return <NavbarBs sticky="top" className="shadow-sm mb-3" style={{height: "6rem", backgroundColor: "#aff09e"}}>
        <Container>
            <Button>
            <Image src={myLogo} fluid style={{width: "280px", height: "120px", position: "absolute", left: 20}}></Image>
            </Button>
            <Nav className="me-auto" style={{position: "absolute", right: 100}}>
                <Nav.Link to={"/"} as={NavLink}>
                    Home
                </Nav.Link>
                <Nav.Link to={"/clinic"} as={NavLink}>
                    Clinic
                </Nav.Link>
                <Nav.Link to={"/pharmacy"} as={NavLink}>
                    Pharmacy
                </Nav.Link>
                <Nav.Link to={"/contact"} as={NavLink}>
                    Contact
                </Nav.Link>
            </Nav>
        </Container>
    </NavbarBs>
}