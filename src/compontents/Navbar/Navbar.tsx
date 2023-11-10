import React, { useEffect, useState } from 'react';
import { Container, Nav, Button, Navbar as AppBar, Image, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import myLogo from './images/logo.png';
import { useContext } from 'react';
import { UserContext, UserContextProps } from '../../context/UserContext';
import { User } from '../../data/users';
import { DoctorContext, DoctorContextProps } from "../../context/DoctorContext";
import styles from '../../style.css'
import {GitHubUserContext, GitHubUserContextProps} from "../../context/Github";

export function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { doctor, setDoctor } = useContext(DoctorContext) as DoctorContextProps;
    const { user, setUser } = useContext(UserContext) as UserContextProps;
    const { githubUser } = useContext(GitHubUserContext) as GitHubUserContextProps;

    useEffect(() => {
        console.log('user:', user);
        console.log('doctor:', doctor);
        console.log('githubUser:', githubUser);

        if (user || doctor || githubUser ) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [user, doctor, githubUser, setIsLoggedIn]);

    const handleLogout = () => {
        setUser(null);
        setDoctor(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('doctor');
        localStorage.removeItem('githubUser');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <AppBar sticky="top" className="shadow-sm mb-0" style={{ height: '6rem', backgroundColor: '#aff09e' }}>
            <Container>
                <Button
                    className="d-md-none"
                    variant="link"
                    onClick={toggleMobileMenu}
                    style={{ position: 'absolute', right: 20, top: 20 }}
                >
                    ☰
                </Button>
                <Nav.Link to={'/'} as={NavLink}>
                    <Button
                        className={'mt-4s d-flex flex-column align-items-center justify-content-center'}
                        variant="link"
                        style={{ width: '300px', height: '95px', position: 'relative', backgroundColor: '#aff09e' }}
                        href={'/'}
                    >
                        <Image src={myLogo} fluid style={{ width: '280px', height: '120px', position: 'relative', left: 20 }} />
                    </Button>
                </Nav.Link>
                <Nav className={`me-auto ${isMobileMenuOpen ? 'd-flex flex-column align-items-center' : 'd-none d-md-flex'}`} style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)' }}>
                    <Nav.Link to={'/pharmacy'} as={NavLink}>Pharmacy</Nav.Link>
                    {isLoggedIn && <Nav.Link to={'/profile'} as={NavLink}>Profile</Nav.Link>}
                    <Nav.Link to={'/about'} as={NavLink}>About</Nav.Link>
                    {(doctor && doctor.role === 'doctor') || (githubUser && githubUser.role === 'admin') ? (
                        <NavDropdown title="Clinic" id="clinic-dropdown">
                            <NavDropdown.Item as={NavLink} to="/clinic/add_drug">Add drug</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/clinic/delete_drug">Delete drug</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/clinic/update_drug">Update drug</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/clinic/add_presc">Add prescription</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/clinic/delete_presc">Delete prescription</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/clinic/update_presc">Update prescription</NavDropdown.Item>
                        </NavDropdown>
                    ): null}
                    {isLoggedIn && <Nav.Link style={{ color: 'red' }} onClick={handleLogout}>Logout</Nav.Link>}
                    <Nav.Link to={'/log'} as={NavLink}>Login</Nav.Link>
                </Nav>
            </Container>
        </AppBar>
    );
}
