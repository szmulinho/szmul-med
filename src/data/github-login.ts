export interface GithubUser {
    id: number;
    username: string;
    email: string;
    role: string;
}

export async function loginToGithub(): Promise<GithubUser> {
    try {
        const response = await fetch('https://szmul-med-github-login.onrender.com/github');
        const data: GithubUser = await response.json();
        return data; // Zwraca obiekt typu GithubUser
    } catch (error) {
        console.error('Błąd podczas logowania:', error);
        throw error;
    }
}

export async function fetchDataFromCallback(): Promise<void> {
    try {
        const response = await fetch('https://szmul-med-github-login.onrender.com/github/callback');
        const data: GithubUser = await response.json();
        console.log('Callback response data:', data);
        // Tutaj możesz obsłużyć dane po pomyślnym callbacku.
    } catch (error) {
        console.error('Błąd podczas pobierania danych z callbacku:', error);
    }
}


