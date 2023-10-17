import axios, { AxiosRequestConfig } from 'axios';
import { Drug } from './drugstore';

export type Drugs = string[];

export interface Prescription {
    pre_id: number;
    drugs: Drugs;
    patient: string;
    expiration: string;
    [key: string]: any;
}

export async function getPresc(): Promise<Prescription[]> {
    const response = await axios.get('http://localhost:8080/prescs');
    return response.data;
}

export async function postPresc(postData: Prescription): Promise<Prescription[]> {
    const response = await axios.post('http://localhost:8080/presc', postData);
    return response.data;
}




export async function GetPrescID(preId: string): Promise<Prescription> {
    const response = await axios.get(`http://localhost:8080/presc/${preId}`);
    return response.data;
}

export async function GetPatientPresc(patient: string): Promise<Prescription> {
    const response = await axios.get(`http://localhost:8080/patient/${patient}`);
    return response.data;
}

export async function deletePresc(id: string): Promise<void> {
    try {
        await axios.delete(`http://localhost:8080/prescs/${id}`);
    } catch (error) {
        console.error(`Error deleting prescription with ID ${id}: ${error}`);
    }
}
