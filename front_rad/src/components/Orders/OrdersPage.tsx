// src/components/Orders/OrdersPage.tsx
import React, { useState } from 'react';
import OrderForm from './OrderForm';
import OrderList from './OrderList';

const OrdersPage: React.FC = () => {
    const [refresh, setRefresh] = useState(false);

    const handleSave = () => setRefresh(!refresh);

    return (
        <div>
            <h1>Order Management</h1>
            <OrderForm onSave={handleSave} users={[]} />
            <OrderList />
        </div>
    );
};

export default OrdersPage;
