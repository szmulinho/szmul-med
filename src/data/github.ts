import axios, { AxiosRequestConfig } from "axios";
import {User} from "./users";

export interface GithubUser {
    id: number;
    login: string;
    avatarUrl: string;
    htmlUrl: string;
    email: string;
    role: string;
    accessToken: string
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

export async function GetGithubUserData(token: string): Promise<GithubUser> {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get('https://szmul-med-github-login.onrender.com/user', config);
    return response.data;
}
