// src/components/Products/ProductForm.tsx
import React, { useState } from 'react';
import '../../styles/FormStyle.css'; // Import CSS for styles
import {createProduct} from '../../api/productsService';

interface ProductFormProps {
    onSave: () => void;
    product?: { id: number; name: string; description: string; pricePerKg: number };
}

const ProductForm: React.FC<ProductFormProps> = ({ onSave, product }) => {
    const [name, setName] = useState(product ? product.name : '');
    const [description, setDescription] = useState(product ? product.description : '');
    const [pricePerKg, setPricePerKg] = useState(product ? product.pricePerKg : 0);

    const handleSubmit = async (e: React.FormEvent) => {
       
    e.preventDefault();

    const newProduct = {
        name,
        description,
        pricePerKg,
    };

    try {
        await createProduct(newProduct);
        onSave();
    } catch (error) {
        console.error('Failed to create product:', error);
    }

        
    };

    return (
        <div className="form-container">
            <h2 className="form-title">{product ? 'Update Product' : 'Create Product'}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Product Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="form-input" 
                    required 
                />
                <textarea 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className="form-textarea" 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Price per kg" 
                    value={pricePerKg} 
                    onChange={(e) => setPricePerKg(Number(e.target.value))} 
                    className="form-input" 
                    required 
                />
                <button type="submit" className="submit-button">{product ? 'Update Product' : 'Create Product'}</button>
            </form>
        </div>
    );
};

export default ProductForm;
