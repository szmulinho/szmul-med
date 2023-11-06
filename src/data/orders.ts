import axios from 'axios';
import {AxiosRequestConfig} from "axios/index";
import {Prescription} from "./prescription";

export interface Order {
    id: number;
    name: string;
    email: string;
    address: string;
    items: string;
    price: string;
}

export async function getOrder(): Promise<Order[]> {
    const response = await axios.get('https://szmul-med-orders.onrender.com/orders');
    return response.data;
}

export async function postOrder(postData: Order): Promise<Order[]> {
    const response = await axios.post('https://szmul-med-orders.onrender.com/order', postData);
    return response.data;
}

export async function GetOrderByName(name: string): Promise<Order> {
    const response = await axios.get(`https://szmul-med-orders.onrender.com/orders/${name}`);
    return response.data;
}

export async function deleteOrder(id: number): Promise<void> {
    try {
        await axios.delete(`https://szmul-med-orders.onrender.com/order/${id}`);
    } catch (error) {
        console.error(`Error deleting order with ID ${id}: ${error}`);
    }
}


