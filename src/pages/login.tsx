import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';

export function Choose() {
    const navigate = useNavigate();

    function handleLoginClick(path: string) {
        navigate(path);
    }

    function handleGithubLoginClick() {
        // window.location.href = 'https://szmul-med-github-login.onrender.com/login/';
        window.location.href = 'http://localhost:8086/login';

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
                            variant="outline-secondary"
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
                        <Button
                            variant="outline-secondary"
                            color="secondary"
                            onClick={() => handleLoginClick('/login')}
                        >
                            Login
                        </Button>
                        <Button
                            variant="outline-secondary"
                            color="success"
                            onClick={() => handleLoginClick('/register')}
                        >
                            You don't have an account? Sign up!
                        </Button>
                        <div style={{ textAlign: 'justify' }}></div>
                        <IconButton
                            onClick={handleGithubLoginClick}
                            style={{ marginTop: '1rem', color: 'success' }}
                        >
                            <GitHubIcon />
                            Login with GitHub
                        </IconButton>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
