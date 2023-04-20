import {Container, Nav, Navbar as NavbarC, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export function NavbarCl() {
    return (
        <NavbarC
            sticky="top"
            className="mb-5 justify-content-left"
            style={{ height: "3rem", backgroundColor: "rgba(175,240,158,0.4)", width: "100%" }}
            expand="lg"
        >
            <Container fluid>
                <NavbarC.Toggle aria-controls="basic-navbar-nav" />
                <NavbarC.Collapse id="basic-navbar-nav">
                    <Nav className="mt-auto" style={{ font: "status-bar", fontSize: "initial" }}>
                        <NavDropdown title="Prescriptions" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/clinic/add_presc">
                                Add prescription
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/clinic/show_presc">
                                Show all prescriptions
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/clinic/show_presc_id">
                                Show prescription by ID
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/clinic/delete_presc">
                                Delete prescription
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Drugs" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/clinic/add_drug">
                                Add drug
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/clinic/show_all_drugs">
                                Show All Drugs
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/clinic/delete_drug">
                                Delete drug
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/clinic/update_drug">
                                Update drug
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </NavbarC.Collapse>
            </Container>
        </NavbarC>
    );
}
