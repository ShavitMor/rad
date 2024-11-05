import React, { useState } from "react";
import CovidList from "../../components/Covid/CovidList";
import CovidForm from "../../components/Covid/CovidForm";
import '../../styles/Page.css'; // Import the CSS for Navbar


const CovidPage: React.FC = () => {
    const [refresh, setRefresh] = useState(false);

    const handleSave = () => {
        setRefresh(!refresh);
    };

    return (
        <div>
            <h1>COVID Data Management</h1>
            <CovidForm onSave={handleSave} />
            <CovidList key={refresh.toString()} />
        </div>
    );
};

export default CovidPage;
