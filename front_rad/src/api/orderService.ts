import api from './api';
import { Order } from '../components/Orders/Order';

const API_URL = "/orders";

export const fetchOrders = async (): Promise<Order[]> => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const deleteOrder = async (id: string): Promise<void> => {
    try {
        await api.delete(`${API_URL}/${id}`);
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const updateOrder = async (id: string, order: Order): Promise<Order> => {
    try {
        const response = await api.put(`${API_URL}/${id}`, order);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const createOrder = async (order: Order): Promise<Order> => {
    try {
        const response = await api.post(API_URL, order);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const createSchemas = async (organization: string): Promise<any> => {
try {
    const response = await api.post(`${API_URL}/${organization}}`);
    return response.data;
} catch (error: any) {
    alert(error.response.data);
    throw error;
}
}

export const removeSchemas = async (organization: string): Promise<any> => {
try {
    const response = await api.delete(`${API_URL}/schemas/${organization}}`);
    return response.data;
} catch (error: any) {
    alert(error.response.data);
    throw error;
}


}
export const renameSchemas = async (organization: string, newName1: string): Promise<any> => {
    try {
        const response = await api.put(`${API_URL}/schemas/${organization}?newName=${newName1}`);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
}
