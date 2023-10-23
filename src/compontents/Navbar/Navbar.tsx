import React, { useEffect, useState } from 'react';
import { Container, Nav, Button, Navbar as NavbarBs, Image, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import myLogo from './images/logo.png';
import { useContext } from 'react';
import { UserContext, UserContextProps } from '../../context/UserContext';
import { User } from '../../data/users';
import { DoctorContext, DoctorContextProps } from "../../context/DoctorContext";
import { GithubUserContext, GithubUserContextProps } from "../../context/GithubUserContext";

export function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { doctor, setDoctor } = useContext(DoctorContext) as DoctorContextProps;
    const { user, setUser } = useContext(UserContext) as UserContextProps;
    const { githubUser, setGithubUser } = useContext(GithubUserContext) as GithubUserContextProps;

    useEffect(() => {
        console.log('user:', user);
        console.log('doctor:', doctor);
        console.log('githubUser:', githubUser);

        if (user || doctor || githubUser) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [user, doctor, githubUser, setIsLoggedIn]);

    const handleLogout = () => {
        setUser(null);
        setDoctor(null);
        setGithubUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('doctor');
        localStorage.removeItem('githubUser');
    };

    return (
        <NavbarBs sticky="top" className="shadow-sm mb-0" style={{ height: '6rem', backgroundColor: '#aff09e' }}>
            <Container>
                <Nav.Link to={'/home'} as={NavLink}>
                    <Button
                        className={'mt-4s d-flex flex-column align-items-center justify-content-center'}
                        variant="link"
                        style={{ width: '300px', height: '95px', position: 'relative', backgroundColor: '#aff09e' }}
                        href={'/'}
                    >
                        <Image src={myLogo} fluid style={{ width: '280px', height: '120px', position: 'relative', left: 20 }} />
                    </Button>
                </Nav.Link>
                <Nav className="me-auto" style={{ position: 'absolute', right: 100 }}>
                    <Nav.Link to={'/pharmacy'} as={NavLink}>Pharmacy</Nav.Link>
                    <Nav.Link to={'/contact'} as={NavLink}>Contact</Nav.Link>
                    <Nav.Link to={'/about'} as={NavLink}>About</Nav.Link>
                    {(doctor && doctor.role === 'doctor') || (githubUser && githubUser.role === 'admin') ? (
                        <NavDropdown title="Clinic" id="clinic-dropdown">
                            <NavDropdown.Item as={NavLink} to="/clinic/add_drug">Add drug</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/clinic/delete_drug">Delete drug</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/clinic/show_all_drugs">Show all drugs</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/clinic/update_drug">Update drug</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/clinic/add_presc">Add prescription</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/clinic/delete_presc">Delete prescription</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/clinic/show_presc">Show all prescriptions</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/clinic/show_presc_id">Show prescription by ID</NavDropdown.Item>
                        </NavDropdown>
                    ): null}
                        {isLoggedIn && <Nav.Link style={{ color: 'red' }} onClick={handleLogout}>Logout</Nav.Link>}
                    <Nav.Link to={'/log'} as={NavLink}>Login</Nav.Link>
                </Nav>
            </Container>
        </NavbarBs>
    );
}

