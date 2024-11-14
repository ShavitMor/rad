import React, { useState } from 'react';
import { register } from '../api/authService';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [organizationname, setOrganizationname] = useState('');

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        register({ organizationname: organizationname, username, email, password });
        
        console.log("Registered with:", { username, email, password });
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Organization Name"
                    value={organizationname}
                    onChange={(e) => setOrganizationname(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
