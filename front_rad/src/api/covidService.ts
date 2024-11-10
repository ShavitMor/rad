import api from './api';
import { Covid } from "../components/Covid/Covid";

const API_URL = "/covid";

export const fetchCovidData = async (): Promise<Covid[]> => {
    try {
        const response = await api.get<Covid[]>(API_URL);
        return response.data;
    } catch (error: any) {
        alert(`Error: ${error.response?.data}`);
        throw error;
    }
};

export const getCountryCovidData = async (country: string): Promise<Covid> => {
    try {
        const response = await api.get<Covid>(`${API_URL}/statistics`, {
            params: { country },
        });
        return response.data;
    } catch (error: any) {
        alert(`Error: ${error.response?.data}`);
        throw error;
    }
};

export const createCovidData = async (covid: Covid): Promise<Covid> => {
    try {
        const response = await api.post<Covid>(`${API_URL}/add`, covid, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error: any) {
        alert(`Error: ${error.response?.data}`);
        throw error;
    }
};

export const updateCovidData = async (id: string, covid: Covid): Promise<Covid> => {
    try {
        const response = await api.put<Covid>(`${API_URL}/update/${id}`, covid, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error: any) {
        alert(`Error: ${error.response?.data}`);
        throw error;
    }
};

export const deleteCovidData = async (id: string): Promise<void> => {
    try {
        await api.delete(`${API_URL}/delete/${id}`);
    } catch (error: any) {
        alert(`Error: ${error.response?.data}`);
        throw error;
    }
};
