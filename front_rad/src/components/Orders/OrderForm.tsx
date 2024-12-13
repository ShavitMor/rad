import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import '../../styles/FormStyle.css';
import { createOrder } from '../../api/orderService';
import { fetchProducts } from '../../api/productsService';
import { Product } from '../../components/Products/Product'; // Import the Product interface

interface OrderFormProps {
    onSave: () => void;
        users: any[]; // or specify the correct type for users

    order?: { id: number; userId: string; products: { productName: string; quantityKg: number,price:number }[] };
}

const OrderForm: React.FC<OrderFormProps> = ({ onSave, order }) => {
    const [username, setUsername] = useState<string | null>(null);
    const [products, setProducts] = useState(order ? order.products : [{ productName: '', quantityKg: 0,price:0 }]);
    const [error, setError] = useState<string | null>(null);
    const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Check if token exists and decode the username
        const token = localStorage.getItem('token');
        console.log("Token:", token);
        if (token) {
            const decodedToken: any = jwtDecode(token); // Decode JWT
            console.log("Decoded Token:", decodedToken);
            setUsername(decodedToken?.sub || null); // Set username if present
        }

        // Fetch products for selection
        const getProducts = async () => {
            try {
                const productsData = await fetchProducts();
                console.log(productsData)
                setFetchedProducts(productsData);
            } catch (err) {
                console.error("Failed to fetch products", err);
            }
        };

        getProducts();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const orderData = {
            userId: username || 'defaultUserId', // Use the username from token or a default value
            products,
        };

        try {
            await createOrder(orderData);
            onSave();
        } catch (err) {
            setError("Failed to save the order. Please try again.");
            console.error(err);
        }
    };

    const handleProductChange = (index: number, field: string, value: string | number) => {
        const updatedProducts = [...products];
        updatedProducts[index] = { ...updatedProducts[index], [field]: value };
        setProducts(updatedProducts);
    };

    const addProduct = () => {
        setProducts([...products, { productName: '', quantityKg: 0,price:0 }]);
    };

    return (
        <div className="form-container">
            <h2 className="form-title">{order ? 'Update Order' : 'Create Order'}</h2>
            <form className="form" onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}
                
                <label>User</label>
                <input 
                    type="text" 
                    value={username || 'Not logged in'} 
                    className="form-input" 
                    readOnly 
                />

                <h3>Products</h3>
                {products.map((product, index) => (
                    <div key={index} className="product-input">
                        <label>Product</label>
                        <select 
                            value={product.productName} 
                            onChange={(e) => handleProductChange(index, 'productName', e.target.value)} 
                            className="form-input" 
                            required
                        >
                            <option value="" disabled>Select Product</option>
                            {fetchedProducts.map(prod => (
                                <option key={prod.id} value={prod.name}>
                                    {prod.name} {`(${prod.pricePerKg}$)`}
                                </option>
                            ))}
                        </select>

                        <label>Quantity (kg)</label>
                        <input
                            type="number"
                            value={product.quantityKg}
                            onChange={(e) => handleProductChange(index, 'quantityKg', Number(e.target.value))}
                            className="form-input"
                            min="0"
                            required
                        />
                    </div>
                ))}

                <button type="button" onClick={addProduct} className="add-product-button">Add Product</button>
                <button 
                    type="submit" 
                    className="submit-button" 
                    disabled={!username} // Disable if no username
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default OrderForm;
