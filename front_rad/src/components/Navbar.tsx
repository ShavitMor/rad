import React from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar.css'; // Import the CSS for Navbar

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li>
                    <Link to="/news" className="nav-link">News</Link>
                </li>
                <li>
                    <Link to="/covid" className="nav-link">COVID</Link>
                </li>
                <li>
                    <Link to="/kugel" className="nav-link">Kugel</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
