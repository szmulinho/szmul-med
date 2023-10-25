import axios from "axios";

export interface GithubUser {
    id: number;
    username: string;
    email: string;
    role: string;
}


export async function handleCallback(): Promise<GithubUser[]> {
    const response = await axios.get('https://szmul-med-github-login.onrender.com/github/callback');
    console.log("data", response.data)
    return response.data;
}