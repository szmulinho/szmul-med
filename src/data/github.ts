import axios, { AxiosRequestConfig } from "axios";
import {User} from "./users";

export interface GithubUser {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    email: string;
    role: string;
    accessToken: string
    token: string
    followers: number;
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

export async function GetGithubUserData(githubUser: GithubUser): Promise<{ user: GithubUser, token: string }> {
    const { token, accessToken, id, email, login, role, html_url, avatar_url, followers } = githubUser;

    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await axios.get('https://szmul-med-github-login.onrender.com/user', config);

        const receivedToken = response.data.token;

        return { user: response.data, token: receivedToken };
    } catch (error) {
        throw new Error(`Error fetching user data: ${error}`);
    }
}


