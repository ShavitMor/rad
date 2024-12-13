import axios from 'axios';
import { Product } from '../components/Products/Product';

const API_URL = "http://aa547d65f2d104528955bbe360e40030-388049372.us-east-2.elb.amazonaws.com:8080/products";
const headers = {
    headers: {
        'X-PrivateTenant': 'public'
    }
};

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get(API_URL, headers);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const createProduct = async (product: Product): Promise<Product> => {
    try {
        const response = await axios.post(API_URL, product, headers);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const updateProduct = async (id: number, product: Product): Promise<Product> => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, product, headers);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const deleteProduct = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`, headers);
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};
