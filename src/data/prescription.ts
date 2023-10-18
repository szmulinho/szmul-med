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
    const response = await axios.get('https://szmul-med-prescription.onrender.com/prescs');
    return response.data;
}

export async function postPresc(postData: Prescription): Promise<Prescription[]> {
    const response = await axios.post('https://szmul-med-prescription.onrender.com/presc', postData);
    return response.data;
}




export async function GetPrescID(preId: string): Promise<Prescription> {
    const response = await axios.get(`https://szmul-med-prescription.onrender.com/presc/${preId}`);
    return response.data;
}

export async function GetPatientPresc(patient: string): Promise<Prescription> {
    const response = await axios.get(`https://szmul-med-prescription.onrender.com/patient/${patient}`);
    return response.data;
}

export async function deletePresc(id: string): Promise<void> {
    try {
        await axios.delete(`https://szmul-med-prescription.onrender.com/prescs/${id}`);
    } catch (error) {
        console.error(`Error deleting prescription with ID ${id}: ${error}`);
    }
}
