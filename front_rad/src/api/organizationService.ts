import { Organization } from '../components/Organization/Organization';
import axios from 'axios';

const API_WITHOUT_HEADER = "http://aa547d65f2d104528955bbe360e40030-388049372.us-east-2.elb.amazonaws.com:8080/organizations";
const HEADERS = {
    headers: {
        'X-PrivateTenant': 'public'
    }
};

export const fetchOrganizations = async (): Promise<Organization[]> => {
    try {
        const response = await axios.get(API_WITHOUT_HEADER, HEADERS);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const fetchOrganizationById = async (id: string): Promise<Organization> => {
    try {
        const response = await axios.get(`${API_WITHOUT_HEADER}/${id}`, HEADERS);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const createOrganization = async (organization: Omit<Organization, 'id'>): Promise<Organization> => {
    try {
        const response = await axios.post(API_WITHOUT_HEADER, organization, HEADERS);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const updateOrganization = async (id: string, organization: Omit<Organization, 'id'>): Promise<Organization> => {
    try {
        const response = await axios.put(`${API_WITHOUT_HEADER}/${id}`, organization, HEADERS);
        return response.data;
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};

export const deleteOrganization = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_WITHOUT_HEADER}/${id}`, HEADERS);
    } catch (error: any) {
        alert(error.response.data);
        throw error;
    }
};


