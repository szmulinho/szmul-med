import axios, { AxiosRequestConfig } from "axios";

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

export async function GetUserData(code: string): Promise<GithubUser | null> {
    try {
        const response = await fetch(`http://localhost:8086/user`);

        if (!response.ok) {
            console.error('Error:', response.statusText);
            return null;
        }

        const userData: GithubUser = await response.json();
        return userData;
    } catch (error) {
        console.error('Error occurred while fetching user data:', error);
        return null;
    }
}


