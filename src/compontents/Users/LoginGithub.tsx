// App.tsx

import React from 'react';
import GithubLoginButton from './LoginGithubButton';

const App: React.FC = () => {
    const handleGitHubLoginSuccess = (response: any) => {
        console.log('GitHub login success:', response);
        // Tutaj możesz dodać kod obsługujący sukces logowania
    };

    const handleGitHubLoginFailure = (response: any) => {
        console.error('GitHub login error:', response);
        // Tutaj możesz dodać kod obsługujący błąd logowania
    };

    return (
        <div className="App">
            <h1>GitHub Login Example</h1>
            <GithubLoginButton onSuccess={handleGitHubLoginSuccess} onFailure={handleGitHubLoginFailure} />
        </div>
    );
}

export default App;
