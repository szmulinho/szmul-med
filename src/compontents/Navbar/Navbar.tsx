import { Container, Nav, Button, Navbar as NavbarBs, Image, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import myLogo from "./images/logo.png";
import { useContext } from "react";
import { UserContext, UserContextProps } from "../../context/UserContext";
import { User } from "../../data/prescription";

export function Navbar() {
    const { user, setUser } = useContext(UserContext) as UserContextProps;
    const isDoctor = user?.role === "doctor";

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("token");
        navigator("/home");
    };

    return (
        <NavbarBs sticky="top" className="shadow-sm mb-0" style={{ height: "6rem", backgroundColor: "#aff09e" }}>
            <Container>
                <Button
                    className={"mt-4s d-flex flex-column align-items-center justify-content-center"}
                    variant="link"
                    style={{ width: "300px", height: "95px", position: "relative", backgroundColor: "#aff09e" }}
                    href={"/"}
                >
                    <Image src={myLogo} fluid style={{ width: "280px", height: "120px", position: "relative", left: 20 }} />
                </Button>
                <Nav className="me-auto" style={{ position: "absolute", right: 100 }}>
                    <Nav.Link to={"/pharmacy"} as={NavLink}>
                        Pharmacy
                    </Nav.Link>
                    <Nav.Link to={"/contact"} as={NavLink}>
                        Contact
                    </Nav.Link>
                    <Nav.Link to={"/about"} as={NavLink}>
                        About
                    </Nav.Link>
                    {isDoctor && (
                        <Nav.Link to={"/clinic"} as={NavLink}>
                            Clinic
                        </Nav.Link>
                    )}
                    {user ? (
                        <Nav.Link style={{color: "red"}} onClick={handleLogout}>Logout</Nav.Link>
                    ) : (
                        <Nav.Link to={"/log"} as={NavLink}>
                            Login
                        </Nav.Link>
                    )}
                </Nav>
            </Container>
        </NavbarBs>
    );
}
