import React, { useEffect, useState } from "react";
import { News } from "./News";
import { fetchNews, deleteNews, updateNews, fetchTopHeadlines } from "../../api/newsService";
import '../../styles/List.css';
const formatDateTimeLocal = (date: Date) => {
    const pad = (num: number) => num.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Months are zero-based
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const NewsList: React.FC = () => {
    
    const [news, setNews] = useState<News[]>([]);
    const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
    const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<News>({
        title: "",
        description: "",
        content: "",
        url: "",
        publishedAt: new Date(),
        source: {
            name: "",
            url: ""
        }
    });

    useEffect(() => {
        const getNews = async () => {
            try {
                const newsData = await fetchNews();
                const formattedNewsData = newsData.map(item => ({
                    ...item,
                    publishedAt: new Date(item.publishedAt)
                }));
                setNews(formattedNewsData);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };
        getNews();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteNews(id);
            setNews(news.filter(n => n.id !== id));
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

    const toggleNewsDetails = (id: string) => {
        if (editingNewsId !== id) {
            setSelectedNewsId(selectedNewsId === id ? null : id);
        }
    };

    const handleEdit = (newsItem: News) => {
        setEditingNewsId(newsItem.id || null);
        setEditFormData({
            ...newsItem,
            publishedAt: new Date(newsItem.publishedAt)
        });
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: name === 'publishedAt' ? new Date(value) : value
        }));
    };

    const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setEditFormData(prev => ({
            ...prev,
            source: {
                ...prev.source,
                [name]: value
            }
        }));
    };

    const handleSubmitEdit = async (id: string) => {
        try {
            const updatedNews = await updateNews(id, editFormData);
            setNews(news.map(item => 
                item.id === id ? updatedNews : item
            ));
            setEditingNewsId(null);
            setEditFormData({
                title: "",
                description: "",
                content: "",
                url: "",
                publishedAt: new Date(),
                source: {
                    name: "",
                    url: ""
                }
            });
        } catch (error) {
            console.error('Error updating news:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingNewsId(null);
        setEditFormData({
            title: "",
            description: "",
            content: "",
            url: "",
            publishedAt: new Date(),
            source: {
                name: "",
                url: ""
            }
        });
    };

    const handleFetchTopHeadlines = async () => {
        try {
            await fetchTopHeadlines();
            const newsData = await fetchNews();
            setNews(newsData);
        } catch (error) {
            console.error('Error fetching top headlines:', error);
        }
    };

    return (
        <div>
            <h1>News List</h1>
            <button onClick={handleFetchTopHeadlines}>Add Top-Headlines News</button>
            <ul style={{ direction: 'rtl' }}>
                {news.map(n => (
                    <li key={n.id}>
                        <h3 onClick={() => n.id && toggleNewsDetails(n.id)}>
                            {n.title}
                        </h3>

                        {selectedNewsId === n.id && editingNewsId !== n.id && (
                            <div>
                                {n.description && <p><strong>תיאור:</strong> {n.description}</p>}
                                {n.content && <p><strong>תוכן:</strong> {n.content}</p>}
                                {n.url && <p><strong>כתובת URL:</strong> <a href={n.url} target="_blank" rel="noopener noreferrer">{n.url}</a></p>}
                                {n.publishedAt && <p><strong>פורסם בתאריך:</strong> {new Date(n.publishedAt).toLocaleString()}</p>}
                                {n.source && n.source.name && (
                                    <p>
                                        <strong>מקור:</strong> 
                                        <a href={n.source.url} target="_blank" rel="noopener noreferrer">
                                            {n.source.name}
                                        </a>
                                    </p>
                                )}
                                <div>
                                    <button onClick={() => handleEdit(n)}>
                                        ערוך
                                    </button>
                                    <button onClick={() => n.id && handleDelete(n.id)}>
                                        מחק
                                    </button>
                                </div>
                            </div>
                        )}

                        {editingNewsId === n.id && (
                            <div>
                                <div>
                                    <label>כותרת</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={editFormData.title}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div>
                                    <label>תיאור</label>
                                    <textarea
                                        name="description"
                                        value={editFormData.description}
                                        onChange={handleEditChange}
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label>תוכן</label>
                                    <textarea
                                        name="content"
                                        value={editFormData.content}
                                        onChange={handleEditChange}
                                        rows={5}
                                    />
                                </div>
                                <div>
                                    <label>כתובת URL</label>
                                    <input
                                        type="url"
                                        name="url"
                                        value={editFormData.url}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div>
                                    <label>פורסם בתאריך</label>
                                    <input
                                        type="datetime-local"
                                        name="publishedAt"
                                        value={formatDateTimeLocal(editFormData.publishedAt)}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div>
                                    <label>שם המקור</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editFormData.source.name}
                                        onChange={handleSourceChange}
                                    />
                                </div>
                                <div>
                                    <label>כתובת URL של המקור</label>
                                    <input
                                        type="url"
                                        name="url"
                                        value={editFormData.source.url}
                                        onChange={handleSourceChange}
                                    />
                                </div>
                                <div>
                                    <button onClick={() => n.id && handleSubmitEdit(n.id)}>
                                        שמור
                                    </button>
                                    <button onClick={handleCancelEdit}>
                                        בטל
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsList;
