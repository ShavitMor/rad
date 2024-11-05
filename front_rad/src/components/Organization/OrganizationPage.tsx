import React, { useState } from "react";
import OrganizationForm from "../../components/Organization/OrganizationForm";  
import OrganizationList from "../../components/Organization/OrganizationList";
import { Organization } from "./Organization";
import { createOrganization } from '../../api/organizationService'; // Import your API service

const OrganizationPage: React.FC = () => {
    const [refresh, setRefresh] = useState(false);

    const handleSave = () => {
        setRefresh(!refresh);
    };

    const handleSubmit = async (organization: Omit<Organization, 'id'>) => {
        await createOrganization(organization);
        handleSave(); // Call handleSave after organization is created
    };

    return (
        <div>
            <h1>Organization Management</h1>
            <OrganizationForm onSubmit={handleSubmit} onSave={handleSave} />
            <OrganizationList key={refresh.toString()} />
        </div>
    );
};

export default OrganizationPage;
