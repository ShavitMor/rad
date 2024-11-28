import React, { useState } from "react";
import { User } from "./User";
import { createUser, updateUser } from "../../api/userService";
import '../../styles/FormStyle.css';

interface UserFormProps {
    existingUser?: User;
    onSave: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ existingUser, onSave }) => {
    const [user, setUser] = useState<User>(
        existingUser || { organizationName: "", username: "", email: "", password: "" }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user.id) {
            await updateUser(user.id, user);
        } else {
            await createUser(user);
        }
        onSave();
    };

    return (
        <div className="form-container">
            <h2 className="form-title">{existingUser ? 'Edit User' : 'Add User'}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="organizationName"
                    value={user.organizationName}
                    onChange={handleChange}
                    placeholder="Organization ID"
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className="form-input"
                />
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="form-input"
                />
                {!existingUser && (
                    <input
                        type="password"
                        name="password"
                        value={user.password || ""}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className="form-input"
                    />
                )}
                <button type="submit" className="submit-button">Save</button>
            </form>
        </div>
    );
};

export default UserForm;
