import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GithubLogin = () => {

    const handleLogin = async () => {
        try {
            const response = await axios.get("/api/github/login");
            window.location.href = response.data.redirectUrl;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Login with Github</h2>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default GithubLogin;
