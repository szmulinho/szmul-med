import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import GitHubLoginButton from "../compontents/Users/LoginGithub";

export function Choose() {

    function handleGitHubLoginSuccess(response: any) {
        // Obsłuż udane logowanie przez GitHub
        console.log("GitHub login success:", response);
        // Tutaj możesz podjąć odpowiednie działania po udanym logowaniu, na przykład przekierowanie użytkownika lub zapisanie tokenu dostępu w stanie aplikacji
    }

    function handleGitHubLoginFailure(response: any) {
        // Obsłuż nieudane logowanie przez GitHub
        console.error("GitHub login error:", response);
        // Tutaj możesz podjąć odpowiednie działania po nieudanym logowaniu
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
                            as={Link}
                            to="/doctor_log"
                            variant="outline-success"
                            size="lg"
                            block="true"
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
                        <Button as={Link} to="/login" variant="outline-success" size="lg" block="true">
                            Login
                        </Button>
                        <Button as={Link} to="/register" variant="outline-success" size="lg" block="true">
                            You don't have an account? Sign up!
                        </Button>
                        <div style={{ textAlign: 'justify' }}>
                        <GitHubLoginButton onSuccess={function(response: any): void {
                            throw new Error('Function not implemented.');
                        } } onFailure={function(response: any): void {
                            throw new Error('Function not implemented.');
                        } } />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
