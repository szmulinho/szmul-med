import axios, { AxiosRequestConfig } from 'axios';
import { Drug } from './drugstore';

export interface CreatePrescInput {
    preid: number;
    drugs: string;
    expiration: string;
}

export interface User {
    id: number;
    login: string;
    password: string;
    role: string;
}

export async function getPresc(): Promise<CreatePrescInput[]> {
    const response = await axios.get('http://localhost:8080/prescs');
    return response.data;
}

export async function postPresc(postData: CreatePrescInput): Promise<CreatePrescInput[]> {
    const response = await axios.post('http://localhost:8080/presc', postData);
    return response.data;
}

export async function GetPrescID(preId: string): Promise<CreatePrescInput> {
    const response = await axios.get(`http://localhost:8080/presc/${preId}`);
    return response.data;
}

export async function deletePresc(id: string): Promise<void> {
    try {
        await axios.delete(`http://localhost:8080/prescs/${id}`);
    } catch (error) {
        console.error(`Error deleting prescription with ID ${id}: ${error}`);
    }
}

export async function GetUserData(token: string): Promise<User> {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get('http://localhost:8080/user', config);
    return response.data;
}
