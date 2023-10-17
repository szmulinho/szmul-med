import axios, {AxiosRequestConfig} from "axios";


export interface Doctor {
    id: number;
    login: string;
    password: string;
    role: string;
}


export async function registerDoctor(postData: Doctor): Promise<Doctor[]> {
    const response = await axios.post('http://localhost:8085/register', postData);
    return response.data;
}


export async function GetDoctorData(token: string): Promise<Doctor> {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get('http://localhost:8085/doctor', config);
    return response.data;
}

