import React from 'react';
import { Nav } from 'react-bootstrap';

export function Sidebar() {
    return (
        <Nav className="bg-light sidebar d-flex flex-column" style={{ width: '12%', height: '100vh' }}>
            <Nav.Item className="flex-column">
                <Nav.Link className="flex-column" href="/doctor">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item className="flex-column">
                <Nav.Link className="flex-column" href="/clinic">Clinic</Nav.Link>
            </Nav.Item>
            <Nav.Item className="flex-column">
                <Nav.Link href="#services">Services</Nav.Link>
            </Nav.Item>
            <Nav.Item className="flex-column">
                <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}
