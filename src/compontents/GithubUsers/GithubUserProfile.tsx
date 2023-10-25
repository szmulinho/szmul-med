import React, { useEffect, useState } from "react";
import { GithubUser, loginToGithub } from "../../data/github-login";

const GithubProfile = () => {
    const [user, setUser] = useState<GithubUser | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData: GithubUser = await loginToGithub(); // Określenie typu danych zwracanych przez funkcję loginToGithub
                setUser(userData);
            } catch (error) {
                console.error(error);
                // Możesz obsłużyć błąd tutaj, na przykład, ustawiając błąd w stanie.
            }
        };

        fetchData();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Github Profile</h2>
            <p>ID: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </div>
    );
};

export default GithubProfile;
