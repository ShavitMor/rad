import React, { useState } from "react";
import UserForm from "../../components/User/UserForm";  
import UserList from "../../components/User/UserList";

const UserPage: React.FC = () => {
    const [refresh, setRefresh] = useState(false);

    const handleSave = () => {
        setRefresh(!refresh);
    };

    return (
        <div>
            <h1>User Management</h1>
            <UserForm onSave={handleSave} />
            <UserList key={refresh.toString()} />
        </div>
    );
};

export default UserPage;
