import axios from 'axios';
import { News } from "../components/News/News";

const API_URL = "http://localhost:8080/news";

export const fetchNews = async (): Promise<News[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createNews: (news: News) => Promise<News> = async (news: News): Promise<News> => {
    const response = await axios.post(API_URL, news, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const updateNews = async (id: string, news: News): Promise<News> => {
    const response = await axios.put(`${API_URL}/${id}`, news, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const deleteNews = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};

export const fetchTopHeadlines = async (): Promise<News[]> => {
    const response = await axios.get(`${API_URL}/top-headlines`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};
