import axios from 'axios';
import {AxiosRequestConfig} from "axios/index";

export interface Drug {
    name: string;
    price: string;
}

export interface User {
    login: string
}


export async function getDrug(): Promise<Drug[]> {
    const response = await axios.get('http://localhost:8081/drugs');
    console.log("leki", response.data)
    return response.data;
}

export async function getUsers(): Promise<User[]> {
    const response = await axios.get('http://localhost:8081/users');
    return response.data;
}

export async function postDrug(postData: Drug): Promise<Drug[]> {
    const response = await axios.post('http://localhost:8081/drug', postData);
    return response.data;
}

export async function deleteDrug(id: string): Promise<void> {
    try {
        await axios.delete(`http://localhost:8081/drugs/${id}`);
    } catch (error) {
        console.error(`Error deleting prescription with ID ${id}: ${error}`);
    }
}

export async function updateDrug(id: string, updatedDrug: Partial<Drug>): Promise<Drug> {
    const response = await axios.patch(`http://localhost:8081/drugs/${id}`, updatedDrug);
    return response.data;
}

export async function GetCustomerData(token: string): Promise<User> {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get('http://localhost:8081/user', config);
    return response.data;
}

