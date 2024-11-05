import React, { useState } from "react";
import { News } from "./News";
import { createNews, updateNews } from "../../api/newsService";
import '../../styles/FormStyle.css'; // Import the CSS for NewsForm

interface NewsFormProps {
    existingNews?: News;
    onSave: () => void;
}

const NewsForm: React.FC<NewsFormProps> = ({ existingNews, onSave }) => {
    const [news, setNews] = useState<News>(
        existingNews || {
            title: '',
            description: '',
            content: '',
            url: '',
            publishedAt: new Date(),
            source: { name: '', url: '' } // Initialize source fields
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNews(prev => ({
            ...prev,
            [name]: name === 'publishedAt' ? new Date(value) : value
        }));
    };

    const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNews(prev => ({
            ...prev,
            source: {
                ...prev.source,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (news.id) {
            await updateNews(news.id, news);
        } else {
            await createNews(news);
        }
        onSave();
    };

    const formatDateTimeLocal = (date: Date) => {
        const pad = (num: number) => num.toString().padStart(2, '0');
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1); // Months are zero-based
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return (
        <div className="form-container">
            <h2 className="form-title">{existingNews ? 'Edit News' : 'Add News'}</h2>
            <form className="news-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={news.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                    className="form-input"
                />
                <textarea
                    name="description"
                    value={news.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                    className="form-textarea"
                />
                <textarea
                    name="content"
                    value={news.content}
                    onChange={handleChange}
                    placeholder="Content"
                    required
                    className="form-textarea"
                />
                <input
                    type="url"
                    name="url"
                    value={news.url}
                    onChange={handleChange}
                    placeholder="URL"
                    required
                    className="form-input"
                />
                <input
                    type="datetime-local"
                    name="publishedAt"
                    value={formatDateTimeLocal(news.publishedAt)}
                    onChange={handleChange}
                    required
                    className="form-input"
                />
                <h3>Source</h3>
                <input
                    type="text"
                    name="name"
                    value={news.source.name}
                    onChange={handleSourceChange}
                    placeholder="Source Name"
                    required
                    className="form-input"
                />
                <input
                    type="url"
                    name="url"
                    value={news.source.url}
                    onChange={handleSourceChange}
                    placeholder="Source URL"
                    required
                    className="form-input"
                />
                <button type="submit" className="submit-button">Save</button>
            </form>
        </div>
    );
};

export default NewsForm;
