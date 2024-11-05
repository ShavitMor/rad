import axios from 'axios';
import { Organization } from '../components/Organization/Organization';

const API_URL = 'http://localhost:8080/organizations';

export const fetchOrganizations = async (): Promise<Organization[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const fetchOrganizationById = async (id: string): Promise<Organization> => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const createOrganization = async (organization: Omit<Organization, 'id'>): Promise<Organization> => {
    try {
        const response = await axios.post(API_URL, organization);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const updateOrganization = async (id: string, organization: Omit<Organization, 'id'>): Promise<Organization> => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, organization);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const deleteOrganization = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};
