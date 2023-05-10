import axios from 'axios';

export interface Drug {
    drugid: string;
    name: string;
    price: string;
}

export async function getDrug(): Promise<Drug[]> {
    const response = await axios.get('http://localhost:8081/drugs');
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
