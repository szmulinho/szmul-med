import React, { useContext, useEffect } from 'react';
import { GitHubUserContext, GitHubUserContextProps } from '../../context/Github';

export const GithubProfile: React.FC = () => {
    const { githubUser, isLoggedIn, handleCallback, handleLogout } = useContext(GitHubUserContext) as GitHubUserContextProps;

    useEffect(() => {
        const fetchData = async () => {
            if (isLoggedIn) {
                try {
                    // Pobierz kod autoryzacji z adresu URL
                    const urlParams = new URLSearchParams(window.location.search);
                    const code = urlParams.get('code');

                    if (code) {
                        // Wywołaj funkcję handleCallback z kodem autoryzacji
                        await handleCallback(code);
                    } else {
                        console.error('Code not found in URL.');
                    }
                } catch (error) {
                    console.error('Error occurred while fetching user data:', error);
                }
            }
        };

        fetchData(); // Wywołaj funkcję fetchData po załadowaniu komponentu
    }, [handleCallback, isLoggedIn]);

    return (
        <div>
            <h2>User Profile</h2>
            {isLoggedIn && githubUser ? (
                <div>
                    <img src={githubUser.avatar_url} alt="User Avatar" />
                    <h3>{githubUser.role}</h3>
                    <h3>{githubUser.email}</h3>
                    <h3>{githubUser.login}</h3>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>Loading user data...</div>
            )}
        </div>
    );
};

export default GithubProfile;
