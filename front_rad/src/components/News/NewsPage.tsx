import React, { useState } from "react";
import NewsList from "../../components/News/NewsList";
import NewsForm from "../../components/News/NewsForm";
import '../../styles/Page.css'; // Import the CSS for Navbar

const NewsPage: React.FC = () => {
    const [refresh, setRefresh] = useState(false);

    const handleSave = () => {
        setRefresh(!refresh);
    };

    return (
        <div>
            <h1>News Management</h1>
            <NewsForm onSave={handleSave} />
            <NewsList key={refresh.toString()} />
        </div>
    );
};

export default NewsPage;
