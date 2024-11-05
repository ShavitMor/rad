import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsPage from "./components/News/NewsPage";
import CovidPage from "./components/Covid/CovidPage";
import KugelPage from "./pages/KugelPage"; // Import KugelPage
import UserPage from "./components/User/UserPage"; // Import KugelPage
import ProductsPage from "./components/Products/ProductsPage"; // Import ProductsPage
import OrdersPage from "./components/Orders/OrdersPage"; // Import OrdersPage
import NavBar from "./components/Navbar";
import './styles/App.css'; // Import the main CSS file for the app
import OrganizationPage from "./components/Organization/OrganizationPage";

const App: React.FC = () => {
    return (
        <Router>
            <NavBar />
            <div className="app-content">
                <Routes>
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/covid" element={<CovidPage />} />
                    <Route path="/kugel" element={<KugelPage />} /> {/* Route for Kugel Page */}
                    <Route path="/products" element={<ProductsPage />} /> {/* Route for Products Page */}
                    <Route path="/orders" element={<OrdersPage />} /> {/* Route for Orders Page */}
                    <Route path="/users" element={<UserPage/>}/> {/* */ }
                    <Route path="/organizations" element={<OrganizationPage/>}/> {/* */ }
                </Routes>
            </div>
        </Router>
    );
};

export default App;
