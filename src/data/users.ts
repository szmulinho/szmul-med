import axios, {AxiosRequestConfig} from "axios";
import {Prescription} from "./prescription";


export interface User {
    id: number;
    login: string;
    password: string;
    role: string;
}

export async function GetCustomerData(token: string): Promise<User> {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get('http://localhost:8082/user', config);
    return response.data;
}

export async function getUsers(): Promise<User[]> {
    const response = await axios.get('http://localhost:8082/users');
    return response.data;
}

