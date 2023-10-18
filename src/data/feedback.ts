import axios from 'axios';
import {AxiosRequestConfig} from "axios/index";

export interface Opinion {
    rating: number;
    comment: string;
}

export async function getOpinon(): Promise<Opinion[]> {
    const response = await axios.get('https://szmul-med-feedback.onrender.com/get_all');
    console.log("leki", response.data)
    return response.data;
}

export async function postOpinion(postData: Opinion): Promise<Opinion[]> {
    const response = await axios.post('https://szmul-med-feedback.onrender.com/add_opinion', postData);
    return response.data;
}