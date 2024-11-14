import React, { useEffect, useState } from "react";
import { User } from "./User";
import { fetchUsers, deleteUser, updateUser } from "../../api/userService";
import '../../styles/List.css';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<User>({
        id: "",
        organizationName:"",
        username: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        const getUsers = async () => {
            try {
                const usersData = await fetchUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        getUsers();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const toggleUserDetails = (id: string) => {
        if (editingUserId !== id) {
            setSelectedUserId(selectedUserId === id ? null : id);
        }
    };

    const handleEdit = (user: User) => {
        setEditingUserId(user.id || null);
        setEditFormData(user);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitEdit = async (id: string) => {
        try {
            const updatedUser = await updateUser(id, editFormData);
            setUsers(users.map(user => user.id === id ? updatedUser : user));
            setEditingUserId(null);
            setEditFormData({ id: "",  organizationName:"", username: "", email: "", password: "" });
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingUserId(null);
        setEditFormData({ id: "",  organizationName:"", username: "", email: "", password: "" });
    };

    return (
        <div>
            <h1>User List</h1>
            <ul >
                {users.map(user => (
                    <li key={user.id}>
                        <h3 onClick={() => user.id && toggleUserDetails(user.id)}>
                            {user.username}
                        </h3>

                        {selectedUserId === user.id && editingUserId !== user.id && (
                            <div>
                                <p><strong>Id:</strong> {user.id}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Organization Name:</strong> {user.organizationName}</p>
                                <p><strong>Password:</strong> {user.password}</p>
                                <div>
                                    <button onClick={() => handleEdit(user)}>
                                        Edit
                                    </button>
                                    <button onClick={() => user.id && handleDelete(user.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}

                        {editingUserId === user.id && (
                            <div>
                                <div>
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={editFormData.username}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editFormData.email}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                  <div>
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={editFormData.password}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div>
                                    <button onClick={() => user.id && handleSubmitEdit(user.id)}>
                                        Save
                                    </button>
                                    <button onClick={handleCancelEdit}>
                                        Cancel
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

export default UserList;
