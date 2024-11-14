// src/api/authService.ts
import api from './api';

interface AuthResponse {
    token: string;
    // You can include additional fields if your API returns more data, such as `user` details.
}

interface loginCredentials {
    username: string;
    password: string;
    organizationname: string;
}

interface registerCredentials {
    organizationname: string;
    username: string;
    email: string;
    password: string;
}

export const login = async (credentials: loginCredentials) => {
    try {
        console.log(credentials.organizationname);
        
        const response = await api.post('/auth/login', credentials, {
            headers: {
                'X-PrivateTenant': credentials.organizationname
            }
        });
        // Save token in localStorage
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem("organizationname", response.data.user.organizationname);
        return response.data.jwt;
    } catch (error: any) {
        alert(error.response?.data || "An error occurred during login.");
        throw error;
    }
};

export const register = async (credentials: registerCredentials): Promise<AuthResponse> => {
    try {
        const response = await api.post<AuthResponse>('/auth/register', credentials, {
            headers: {
                'X-PrivateTenant': credentials.organizationname
            }
        });
     
        return response.data;
    } catch (error: any) {
        alert(error.response?.data || "An error occurred during registration.");
        throw error;
    }
};

export const logout = (): void => {
    // Remove token from localStorage
        localStorage.removeItem('organizationname');
    localStorage.removeItem('token');
    localStorage.removeItem('organizationname');
};

export const isAuthenticated = (): boolean => {
    // Check if token is present in localStorage
    return Boolean(localStorage.getItem('token'));
};
