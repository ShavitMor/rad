import { News } from "../components/News/News";
import api from './api';

const API_URL = "/news";

export const fetchNews = async (): Promise<News[]> => {
    const response = await api.get<News[]>(API_URL);
    return response.data;
};

export const createNews = async (news: News): Promise<News> => {
    const response = await api.post<News>(API_URL, news, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const updateNews = async (id: string, news: News): Promise<News> => {
    const response = await api.put<News>(`${API_URL}/${id}`, news, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const deleteNews = async (id: string): Promise<void> => {
    await api.delete(`${API_URL}/${id}`);
};

export const fetchTopHeadlines = async (): Promise<News[]> => {
    const response = await api.get<News[]>(`${API_URL}/top-headlines`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};
