import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import {GitHubUserContext, GitHubUserContextProps} from "../../context/Github";

export function CreateGithubUser() {
    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { githubUser, login: loginContext } = useContext(GitHubUserContext) as GitHubUserContextProps;

    const defaultLogin = githubUser?.login || "";
    const defaultEmail = githubUser?.email || "";

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch("http://localhost:8086/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login: login,
                name: name,
                email: email,
                password: password,
            }),
        });

        if (response.ok) {
            navigate("/login");
        } else {
            alert("Registration failed. Please try again.");
        }
    };


    // Aktualizacja danych użytkownika w kontekście na podstawie formularza
    const handleUpdateUserContext = async () => {
        try {
            const githubResponse = await fetch("http://localhost:8086/callback", {
                method: "GET",
                headers: {
                    // Dodaj nagłówki autoryzacyjne, jeśli są wymagane
                },
            });
            if (githubResponse.ok) {
                const githubUserData = await githubResponse.json();

                // Aktualizuj stan komponentu na podstawie danych z GitHub
                setLogin(githubUserData.login);
                setEmail(githubUserData.email);

                // Aktualizuj dane użytkownika w kontekście
                loginContext({
                    id: githubUserData.id || 0,
                    login: githubUserData.login || "",
                    avatar_url: githubUserData.avatar_url || "",
                    html_url: githubUserData.html_url || "",
                    email: githubUserData.email || "",
                    role: githubUserData.role || "",
                    accessToken: githubUserData.accessToken || "",
                    token: githubUserData.token || "",
                    followers: githubUserData.followers || 0,
                });
            } else {
                console.error('GitHub fetch failed:', githubResponse.status, githubResponse.statusText);
            }
        } catch (error) {
            console.error('Error fetching data from GitHub:', error);
        }
    };

    return (
        <div className="container">
            <h1>Register</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formLogin">
                    <Form.Label>Login</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter login"
                        value={login}
                        onChange={(event) => setLogin(event.target.value)}
                        onBlur={handleUpdateUserContext}
                    />
                </Form.Group>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        onBlur={handleUpdateUserContext}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    );
}
