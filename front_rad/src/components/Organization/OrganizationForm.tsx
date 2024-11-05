import React, { useState, useEffect } from 'react';
import { Organization } from './Organization';
import {createOrganization} from '../../api/organizationService'; // Adjust the path as needed

interface OrganizationFormProps {
    onSubmit: (organization: Omit<Organization, 'id'>) => Promise<void>; // Ensure it returns a Promise
    initialData?: Organization; // For editing an organization
    onCancel?: () => void;
    onSave?: () => void; // Optional to call when saving
}

const OrganizationForm: React.FC<OrganizationFormProps> = ({ initialData, onCancel, onSave }) => {
    const [formData, setFormData] = useState<Omit<Organization, 'id'>>({
        name: initialData?.name || '',
        address: initialData?.address || '',
    });

    useEffect(() => {
        // Reset form data when initialData changes (for editing)
        if (initialData) {
            setFormData({
                name: initialData.name,
                address: initialData.address,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
          
            await createOrganization(formData);
            

            if (onSave) {
                onSave(); // Call onSave to refresh the organization list
            }
        } catch (error) {
            console.error("Failed to save organization:", error);
        }
    };

    return (
         <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required // Ensures that the field is not empty
                />
            </div>
            <div>
                <label>Address:</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required // Ensures that the field is not empty
                />
            </div>
            <button type="submit">Save</button>
            {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
        </form>
        </div>
    );
};

export default OrganizationForm;
