import React, { useEffect, useState } from 'react';
import '../../styles/OrderList.css';
import { fetchOrders, updateOrder, deleteOrder } from '../../api/orderService';
import { Order } from './Order';

const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<Order>({
        id: '',
        userId: '',
        products: [],
    });

    useEffect(() => {
        const getOrders = async () => {
            try {
                const data = await fetchOrders();
                console.log(data)
                setOrders(data);
                console.log( orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        getOrders();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteOrder(id);
            setOrders(orders.filter(order => order.id !== id));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const toggleOrderDetails = (id: string) => {
        if (editingOrderId !== id) {
            setSelectedOrderId(selectedOrderId === id ? null : id);
        }
    };

    const handleEdit = (order: Order) => {
        if (order.id) {
            setEditingOrderId(order.id);
        }
        setEditFormData(order);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        console.log("hi");
        setEditFormData(prev => {
            const updatedProducts = [...prev.products];
            updatedProducts[index] = {
                ...updatedProducts[index],
                [name]: name === 'quantityKg' ? parseFloat(value) : value,
            };
            return { ...prev, products: updatedProducts };
        });
    };

    const handleSubmitEdit = async (id: string) => {
        try {
            const updatedOrder = await updateOrder(id, editFormData);
            setOrders(orders.map(order => (order.id === id ? updatedOrder : order)));
            setEditingOrderId(null);
            setEditFormData({ id: '', userId: '', products: [] });
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingOrderId(null);
        setEditFormData({ id: '', userId: '', products: [] });
    };

    return (
        <div>
            <h2 className="order-list-title">Orders</h2>
            <ul className="order-list">
                {Array.isArray(orders) && orders.map((order) => (
                    <li key={order.id} className="order-item">
                        <h3 onClick={() => order.id && toggleOrderDetails(order.id)} className="order-title">Order ID: {order.id}</h3>
                        <p className="order-user">User Name: {order.userId}</p>

                        {selectedOrderId === order.id && editingOrderId !== order.id && (
                            <div>
                                <div className="order-products">
                                    <h4>Products:</h4>
                                    <ul>
                                        {order.products.map((product, index) => (
                                            <li key={index} className="product-detail">
                                                Product Name: {product.productName}, Quantity: {product.quantityKg} kg
                                            </li>
                                        ))}
                                    </ul>
                                    <h4>Total Price: ${order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}</h4>
                                </div>
                                <div className="order-actions">
                                    <button onClick={() => handleEdit(order)}>Edit</button>
                                    <button onClick={() => order.id && handleDelete(order.id)}>Delete</button>
                                </div>
                            </div>
                        )}

                        {editingOrderId === order.id && (
                            <div>
                                <h4>Edit Order</h4>
                                <div className="order-products">
                                    <h4>Products:</h4>
                                    {editFormData.products.map((product, index) => (
                                        <div key={index}>
                                            <label>Product Name:</label>
                                            <input
                                                type="text"
                                                name="productName"
                                                value={product.productName}
                                                onChange={(e) => handleEditChange(e, index)}
                                            />
                                            <label>Quantity (kg):</label>
                                            <input
                                                type="number"
                                                name="quantityKg"
                                                value={product.quantityKg}
                                                onChange={(e) => handleEditChange(e, index)}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="order-actions">
                                    <button onClick={() => order.id && handleSubmitEdit(order.id)}>Save</button>
                                    <button onClick={handleCancelEdit}>Cancel</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;
