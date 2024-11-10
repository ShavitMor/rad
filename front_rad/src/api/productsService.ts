import api from './api';
import { Product } from '../components/Products/Product';

const API_URL = "/products";

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const createProduct = async (product: Product): Promise<Product> => {
    try {
        const response = await api.post(API_URL, product);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const updateProduct = async (id: number, product: Product): Promise<Product> => {
    try {
        const response = await api.put(`${API_URL}/${id}`, product);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const deleteProduct = async (id: number): Promise<void> => {
    try {
        await api.delete(`${API_URL}/${id}`);
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};
