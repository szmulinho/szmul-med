import axios from 'axios';
import {AxiosRequestConfig} from "axios/index";

export interface Drug {
    drug_id: number;
    name: string;
    price: number;
    image: string;
}

export async function getAllDrugs(): Promise<Drug[]> {
    const response = await axios.get('https://szmul-med-drugstore.onrender.com/drugs');
    console.log("leki", response.data)
    return response.data;
}

export async function getDrugByName(id: string): Promise<void> {
    try {
        await axios.get(`https://szmul-med-drugstore.onrender.com/drugs/${name}`);
    } catch (error) {
        console.error(`Error deleting prescription with ID ${name}: ${error}`);
    }
}

export async function postDrug(postData: Drug): Promise<Drug[]> {
    const response = await axios.post('https://szmul-med-drugstore.onrender.com/drug', postData);
    return response.data;
}

export async function deleteDrug(id: string): Promise<void> {
    try {
        await axios.delete(`https://szmul-med-drugstore.onrender.com/drugs/${id}`);
    } catch (error) {
        console.error(`Error deleting prescription with ID ${id}: ${error}`);
    }
}

export async function updateDrug(id: string, updatedDrug: Partial<Drug>): Promise<Drug> {
    const response = await axios.patch(`https://szmul-med-drugstore.onrender.com/drugs/${id}`, updatedDrug);
    return response.data;
}

