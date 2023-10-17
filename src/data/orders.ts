import axios from 'axios';
import {AxiosRequestConfig} from "axios/index";

export interface Order {
    id: number;
    name: string;
    email: string;
    address: string;
    items: string;
    price: string;
}

export async function getOrder(): Promise<Order[]> {
    const response = await axios.get('http://localhost:8084/orders');
    return response.data;
}

export async function postOrder(postData: Order): Promise<Order[]> {
    const response = await axios.post('http://localhost:8084/order', postData);
    return response.data;
}

export async function deleteOrder(id: number): Promise<void> {
    try {
        await axios.delete(`http://localhost:8081/order/${id}`);
    } catch (error) {
        console.error(`Error deleting order with ID ${id}: ${error}`);
    }
}


