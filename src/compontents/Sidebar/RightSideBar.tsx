import React from 'react';
import { Nav } from 'react-bootstrap';

export function RightSidebar() {
    return (
        <Nav className="bg-light sidebar" style={{ width: '8%', height: '100vh', position: 'fixed', top: 0, right: 0 }}>
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
