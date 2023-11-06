import axios, {AxiosRequestConfig} from "axios";


export interface User {
    id: number;
    login: string;
    email: string;
    password: string;
    role: string;
}

export async function GetCustomerData(token: string): Promise<User> {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get('https://szmul-med-users.onrender.com/user', config);
    return response.data;
}

export async function getUsers(): Promise<User[]> {
    const response = await axios.get('https://szmul-med-users.onrender.com/users');
    return response.data;
}

