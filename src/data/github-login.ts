import axios, {AxiosRequestConfig} from "axios";
import {Prescription} from "./prescription";


export interface GithubUser {
    id: number;
    name: string;
    email: string;
    role: string;
}

export async function getGithubUserData(token: string): Promise<GithubUser> {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get('https://szmul-med-github-user.onrender.com/github', config);
    return response.data;
}

export async function getGithubUser(): Promise<GithubUser[]> {
    const response = await axios.get('https://szmul-med-github-user.onrender.com/github');
    return response.data;
}

