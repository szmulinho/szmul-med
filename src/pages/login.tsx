import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

export function Choose() {
    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col xs={12} md={6}>
                    <div className="d-flex flex-column rounded border border-secondary p-3">
                        <div className="d-flex justify-content-center mb-3">
                            <h2>Login for doctors</h2>
                        </div>
                        <Button
                            as={Link}
                            to="/doctor_log"
                            variant="secondary"
                            size="lg"
                            block="true"
                        >
                            Login for doctors
                        </Button>
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div className="d-flex flex-column rounded border border-secondary p-3">
                        <div className="d-flex justify-content-center mb-3">
                            <h2>Login for users</h2>
                        </div>
                        <Button as={Link} to="/login" variant="secondary" size="lg" block="true">
                            Login
                        </Button>
                        <Button as={Link} to="/register" variant="secondary" size="lg" block="true">
                            You don't have an account? Sign up!
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
