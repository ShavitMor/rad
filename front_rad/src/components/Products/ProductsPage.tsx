// src/components/Products/ProductsPage.tsx
import React, { useState } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

const ProductsPage: React.FC = () => {
    const [refresh, setRefresh] = useState(false);

    const handleSave = () => setRefresh(!refresh);

    return (
        <div>
            <h1>Product Management</h1>
            <ProductForm onSave={handleSave} />
            <ProductList />
        </div>
    );
};

export default ProductsPage;
