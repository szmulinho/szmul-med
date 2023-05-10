import axios from 'axios';

export interface CreatePrescInput {
    preid: string;
    drugs: string[];
    expiration: string;
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