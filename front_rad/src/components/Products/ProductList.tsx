// src/components/Products/ProductList.tsx
import React, { useEffect, useState } from 'react';
import '../../styles/ProductList.css';
import { fetchProducts, updateProduct, deleteProduct } from '../../api/productsService';

interface Product {
    id: number;
    name: string;
    description: string;
    pricePerKg: number;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [editingProductId, setEditingProductId] = useState<number | null>(null);
    const [editFormData, setEditFormData] = useState<Product>({
        id: 0,
        name: '',
        description: '',
        pricePerKg: 0,
    });

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data.map(product => ({
                    ...product,
                    id: product.id !== undefined ? product.id : 0, // Ensure id is a number
                })));
            } catch (error) {
                console.error('Error fetching Products:', error);
            }
        };
        getProducts();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const toggleProductDetails = (id: number) => {
        if (editingProductId !== id) {
            setSelectedProductId(selectedProductId === id ? null : id);
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProductId(product.id);
        setEditFormData(product);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: name === 'price_per_kg' ? parseFloat(value) : value,
        }));
    };

    const handleSubmitEdit = async (id: number) => {
        try {
            const updatedProduct = await updateProduct(id, editFormData);
            setProducts(products.map(p => (p.id === id ? { ...updatedProduct, id: updatedProduct.id ?? 0 } : p)));
            setEditingProductId(null);
            setEditFormData({ id: 0, name: '', description: '', pricePerKg: 0 });
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product. Please try again.');
        }
    };

    const handleCancelEdit = () => {
        setEditingProductId(null);
        setEditFormData({ id: 0, name: '', description: '', pricePerKg: 0 });
    };

    return (
        <div>
            <h2 className="product-list-title">Products</h2>
            <ul className="product-list">
                {products.map(product => (
                    <li key={product.id} className="product-item">
                        <h3 onClick={() => toggleProductDetails(product.id)} className="product-title">
                            {product.name}
                        </h3>

                        {selectedProductId === product.id && editingProductId !== product.id && (
                            <div>
                                <p><strong>ID:</strong> {product.id}</p>
                                <p><strong>Description:</strong> {product.description}</p>
                                <p><strong>Price per kg:</strong> {product.pricePerKg}</p>
                                <button onClick={() => handleEdit(product)}>Edit</button>
                                <button onClick={() => handleDelete(product.id)}>Delete</button>
                            </div>
                        )}

                        {editingProductId === product.id && (
                            <div>
                                <div>
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editFormData.name}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div>
                                    <label>Description</label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={editFormData.description}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div>
                                    <label>Price per kg</label>
                                    <input
                                        type="number"
                                        name="pricePerKg"
                                        value={editFormData.pricePerKg}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <button onClick={() => handleSubmitEdit(product.id)}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
