import axios from "axios";

export interface GithubUser {
    id: number;
    login: string;
    email: string;
    role: string;
}


export async function handleCallback(code?: string | null): Promise<GithubUser | null> {
    const headers = code ? { Authorization: `Bearer ${code}` } : {};
    const response = await axios.get('https://szmul-med-github-login.onrender.com/github/callback', { headers });
    if (response.status === 200) {
        return response.data;
    } else {
        return null;
    }
}
