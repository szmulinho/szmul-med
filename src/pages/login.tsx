import React, { useRef } from 'react';
import { Link, LinkProps, NavLink, NavLinkProps } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export function Choose() {

    const navigate = useNavigate();

    function handleLoginClick(path: string) {
        navigate(path);
    }

    function handleGithubLoginClick() {
        window.location.href = '/github/login/';
    }


    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col xs={12} md={6}>
                    <div className="d-flex flex-column rounded border border-success p-3">
                        <div className="d-flex justify-content-center mb-3">
                            <h2 className="text-secondary">Login for doctors</h2>
                        </div>
                        <Button
                            variant="outline-success"
                            size="lg"
                            onClick={() => handleLoginClick('/doctor_log')}
                        >
                            Login
                        </Button>
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div className="d-flex flex-column rounded border border-success p-3">
                        <div className="d-flex justify-content-center mb-3">
                            <h2 className="text-secondary">Login for users</h2>
                        </div>
                        <Button variant="outline-success" size="lg" onClick={() => handleLoginClick('/login')} >
                            Login
                        </Button>
                        <Button
                            variant="outline-success"
                            size="lg"
                            onClick={() => handleLoginClick('/register')}
                        >
                            You don't have an account? Sign up!
                        </Button>
                        <div style={{ textAlign: 'justify' }}>
                        </div>
                        <Button variant="outline-success" size="lg" onClick={handleGithubLoginClick}>
                            Login with GitHub
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
