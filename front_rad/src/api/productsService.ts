import axios from 'axios';
import { Product } from '../components/Products/Product'; // Adjust the import based on your project structure

const API_URL = 'http://localhost:8080/products';

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const createProduct = async (product: Product): Promise<Product> => {
    try {
        const response = await axios.post(API_URL, product, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const updateProduct = async (id: number, product: Product): Promise<Product> => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, product, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const deleteProduct = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};
