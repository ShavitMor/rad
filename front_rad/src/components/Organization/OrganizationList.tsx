import React, { useEffect, useState } from 'react';
import { Organization } from './Organization';
import {
    fetchOrganizations,
    deleteOrganization,
    updateOrganization,
} from '../../api/organizationService';
import '../../styles/List.css';

const OrganizationList: React.FC = () => {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [editingOrganizationId, setEditingOrganizationId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<Organization>({
        id: "",
        name: "",
        address: "",
        // Add other fields as necessary
    });

    useEffect(() => {
        const getOrganizations = async () => {
            const organizationsData = await fetchOrganizations();
            setOrganizations(organizationsData);
        };
        getOrganizations();
    }, []);

    const handleDelete = async (id: string) => {
        await deleteOrganization(id);
        setOrganizations(organizations.filter(org => org.id !== id));
    };

    const handleEdit = (organization: Organization) => {
        setEditingOrganizationId(organization.id || null);
        setEditFormData(organization);
    };

    const handleUpdate = async (id: string) => {
        try {
            const updatedOrganization = await updateOrganization(id, editFormData);
            setOrganizations(organizations.map(org =>
                org.id === id ? updatedOrganization : org
            ));
            setEditingOrganizationId(null);
            setEditFormData({ id: "", name: "", address: "" }); // Reset to default
        } catch (error) {
            console.error('Error updating organization:', error);
        }
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCancelEdit = () => {
        setEditingOrganizationId(null);
        setEditFormData({ id: "", name: "", address: "" }); // Reset to default
    };

    return (
        <div>
            <h1>Organizations</h1>
            <ul>
                {organizations.map(org => (
                    <li key={org.id}>
                        <h3>Id: {org.id}</h3>
                        <h3>Name: {org.name}</h3>
                        <h3>Address: {org.address}</h3>
                        
                        
                        {editingOrganizationId === org.id ? (
                            <div>
                             <div>
                                    <label>Organization Id:</label>
                                    <input
                                        type="text"
                                        name="id"
                                        value={editFormData.id}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div>
                                    <label>Organization Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editFormData.name}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div>
                                    <label>Address:</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={editFormData.address}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <button onClick={() => org.id && handleUpdate(org.id)}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <button onClick={() => handleEdit(org)}>Edit</button>
                                <button onClick={() => handleDelete(org.id!)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrganizationList;
