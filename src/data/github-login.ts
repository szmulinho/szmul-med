export interface GithubUser {
    id: number;
    name: string;
    email: string;
    role: string;
}

async function loginToGithub(): Promise<void> {
    try {
        const response = await fetch('https://szmul-med-github-login.onrender.com/github');
        const data: GithubUser = await response.json();
        console.log('Logged in user data:', data);
        // Tutaj możesz obsłużyć dane użytkownika po zalogowaniu.
    } catch (error) {
        console.error('Błąd podczas logowania:', error);
    }
}

async function fetchDataFromCallback(): Promise<void> {
    try {
        const response = await fetch('https://szmul-med-github-login.onrender.com/callback');
        const data: GithubUser = await response.json();
        console.log('Callback response data:', data);
        // Tutaj możesz obsłużyć dane po pomyślnym callbacku.
    } catch (error) {
        console.error('Błąd podczas pobierania danych z callbacku:', error);
    }
}

loginToGithub();
fetchDataFromCallback();
