import React from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
    const isAuthenticated = Boolean(localStorage.getItem('token'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload(); // Refresh to update the navbar state
    };

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li><Link to="/news" className="nav-link">News</Link></li>
                <li><Link to="/covid" className="nav-link">COVID</Link></li>
                <li><Link to="/kugel" className="nav-link">Kugel</Link></li>
                {!isAuthenticated ? (
                    <li><Link to="/login" className="nav-link">Login</Link></li>
                ) : (
                    <li><button onClick={handleLogout} className="nav-link logout-button">Logout</button></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
