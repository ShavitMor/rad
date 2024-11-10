import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsPage from "./components/News/NewsPage";
import CovidPage from "./components/Covid/CovidPage";
import KugelPage from "./pages/KugelPage";
import UserPage from "./components/User/UserPage";
import ProductsPage from "./components/Products/ProductsPage";
import OrdersPage from "./components/Orders/OrdersPage";
import OrganizationPage from "./components/Organization/OrganizationPage";
import NavBar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import './styles/App.css';

const App: React.FC = () => {
    const isAuthenticated = Boolean(localStorage.getItem('token'));

    return (
        <Router>
            <NavBar />
            <div className="app-content">
                <Routes>
                    <Route path="/" element={isAuthenticated ? <NewsPage /> : <LoginPage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/covid" element={<CovidPage />} />
                    <Route path="/kugel" element={<KugelPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/users" element={<UserPage />} />
                    <Route path="/organizations" element={<OrganizationPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
