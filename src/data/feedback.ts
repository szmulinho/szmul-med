import axios from 'axios';
import {AxiosRequestConfig} from "axios/index";

export interface Opinion {
    rating: number;
    comment: string;
}

export async function getOpinon(): Promise<Opinion[]> {
    const response = await axios.get('http://localhost:8083/get_all');
    console.log("leki", response.data)
    return response.data;
}

export async function postOpinion(postData: Opinion): Promise<Opinion[]> {
    const response = await axios.post('http://localhost:8083/add_opinion', postData);
    return response.data;
}