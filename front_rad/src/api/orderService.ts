// src/api/orderService.ts
import axios from 'axios';
import { Order } from '../components/Orders/Order'; // Ensure to create a corresponding Order model

const API_URL = "http://localhost:8080/orders";

export const fetchOrders = async (): Promise<Order[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const deleteOrder = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const updateOrder = async (id: string, order: Order): Promise<Order> => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, order);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const createOrder = async (order: Order): Promise<Order> => {
    try {
        const response = await axios.post(API_URL, order);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};
