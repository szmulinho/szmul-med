import React, { useState, useContext, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { GetDoctorData } from '../../data/doctors';
import {DoctorContext, DoctorContextProps} from "../../context/DoctorContext";

export function DoctorLogin() {
    const navigate = useNavigate();
    const { login } = useContext(DoctorContext) as DoctorContextProps;

    const [doctor, setDoctor] = useState({ login: '', password: '' });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('https://szmul-med-doctors.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(doctor),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                console.log('Token:', token);
                localStorage.setItem('token', token);

                // Pobieranie danych użytkownika po zalogowaniu
                const doctorData = await GetDoctorData(token);
                login(doctorData);
                navigate('/doctor');
            } else {
                alert('Invalid login or password');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Error logging in');
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDoctor((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Login</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter login"
                                name="login"
                                value={doctor.login}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={doctor.password}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
