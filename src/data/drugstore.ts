import axios from 'axios';
import {AxiosRequestConfig} from "axios/index";

export interface Drug {
    drug_id: number;
    name: string;
    price: number;
}

export async function getAllDrugs(): Promise<Drug[]> {
    const response = await axios.get('216.24.57.3:443/drugs');
    console.log("leki", response.data)
    return response.data;
}

export async function getDrugByName(id: string): Promise<void> {
    try {
        await axios.get(`216.24.57.3:443216.24.57.3:443216.24.57.3:443/drugs/${name}`);
    } catch (error) {
        console.error(`Error deleting prescription with ID ${name}: ${error}`);
    }
}

export async function postDrug(postData: Drug): Promise<Drug[]> {
    const response = await axios.post('216.24.57.3:443/drug', postData);
    return response.data;
}

export async function deleteDrug(id: string): Promise<void> {
    try {
        await axios.delete(`216.24.57.3:443/drugs/${id}`);
    } catch (error) {
        console.error(`Error deleting prescription with ID ${id}: ${error}`);
    }
}

export async function updateDrug(id: string, updatedDrug: Partial<Drug>): Promise<Drug> {
    const response = await axios.patch(`216.24.57.3:443/drugs/${id}`, updatedDrug);
    return response.data;
}

