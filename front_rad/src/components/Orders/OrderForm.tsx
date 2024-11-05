import React, { useState, useEffect } from 'react';
import '../../styles/FormStyle.css'; // Import CSS for styles
import { createOrder } from '../../api/orderService';
import { fetchUsers } from '../../api/userService';
import { User } from '../../components/User/User'; // Import the User interface
import { fetchProducts } from '../../api/productsService';
import { Product } from '../../components/Products/Product'; // Import the Product interface

interface OrderFormProps {
    onSave: () => void;
    order?: { id: number; userId: string; products: { productId: string; quantityKg: number }[] };
}

const OrderForm: React.FC<OrderFormProps> = ({ onSave, order }) => {
    const [userId, setUserId] = useState(order ? order.userId : '');
    const [products, setProducts] = useState(order ? order.products : [{ productId: '', quantityKg: 0 }]);
    const [error, setError] = useState<string | null>(null); // State for error handling
    const [fetchedUsers, setFetchedUsers] = useState<User[]>([]); // Use the User interface
    const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]); // Use the Product interface

    useEffect(() => {
        const getUsers = async () => {
            try {
                const usersData = await fetchUsers();
                setFetchedUsers(usersData);
            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        };

        const getProducts = async () => {
            try {
                const productsData = await fetchProducts();
                setFetchedProducts(productsData);
            } catch (err) { // Handle errors
                console.error("Failed to fetch products", err);
            }
        };

        getUsers();
        getProducts();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission

        const orderData = {
            userId,
            products,
        };

        try {
            await createOrder(orderData); // Create a new order
            onSave(); // Call the onSave function to refresh the order list or perform necessary updates
        } catch (err) {
            setError("Failed to save the order. Please try again."); // Set error message on failure
            console.error(err); // Log error for debugging
        }
    };

    const handleProductChange = (index: number, field: string, value: string | number) => {
        const updatedProducts = [...products];
        updatedProducts[index] = { ...updatedProducts[index], [field]: value };
        setProducts(updatedProducts);
    };

    const addProduct = () => {
        setProducts([...products, { productId: '', quantityKg: 0 }]);
    };

    return (
        <div className="form-container">
            <h2 className="form-title">{order ? 'Update Order' : 'Create Order'}</h2>
            <form className="form" onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>} {/* Display error message */}
                <label>User</label>
                <select value={userId} onChange={(e) => setUserId(e.target.value)} className="form-input" required>
                    <option value="" disabled>Select User</option>
                    {fetchedUsers.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.username} {/* Assuming username is used for display */}
                        </option>
                    ))}
                </select>

                <h3>Products</h3>
                {products.map((product, index) => (
                    <div key={index} className="product-input">
                        <label>Product</label>
                        <select 
                            value={product.productId} 
                            onChange={(e) => handleProductChange(index, 'productId', e.target.value)} 
                            className="form-input" 
                            required
                        >
                            <option value="" disabled>Select Product</option>
                            {fetchedProducts.map(prod => (
                                <option key={prod.id} value={prod.id}>
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
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default OrderForm;
