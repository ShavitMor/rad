import api from './api';
import { User } from '../components/User/User';

const BASE_URL = "/users";

export const createUser = async (user: Partial<User>): Promise<User> => {
    try {
        const response = await api.post(BASE_URL, user);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const fetchUsers = async (): Promise<User[]> => {
    try {
        const response = await api.get(BASE_URL);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const fetchUserById = async (id: string): Promise<User> => {
    try {
        const response = await api.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
    try {
        const response = await api.put(`${BASE_URL}/${id}`, user);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const deleteUser = async (id: string): Promise<void> => {
    try {
        await api.delete(`${BASE_URL}/${id}`);
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};
