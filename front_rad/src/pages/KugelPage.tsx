// src/pages/KugelPage.tsx
import React from "react";
import { Link } from "react-router-dom";

const KugelPage: React.FC = () => {
    return (
        <div className="kugel-page">
            <h1>Kugel Page</h1>
            <h2>Select a page to manage:</h2>
            <ul>
                <li>
                    <Link to="/products" className="nav-link">Products</Link>
                </li>
                <li>
                    <Link to="/orders" className="nav-link">Orders</Link>
                </li>
                <li>
                    <Link to="/users" className="nav-link">Users</Link>
                </li>
                <li>
                    <Link to="/organizations" className="nav-link">Organizations</Link>
                </li>
            </ul>
        </div>
    );
};

export default KugelPage;
