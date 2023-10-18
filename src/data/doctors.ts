import axios, {AxiosRequestConfig} from "axios";


export interface Doctor {
    id: number;
    login: string;
    password: string;
    role: string;
}


export async function registerDoctor(postData: Doctor): Promise<Doctor[]> {
    const response = await axios.post('https://szmul-med-doctors.onrender.com//register', postData);
    return response.data;
}


export async function GetDoctorData(token: string): Promise<Doctor> {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get('https://szmul-med-doctors.onrender.com//doctor', config);
    return response.data;
}

