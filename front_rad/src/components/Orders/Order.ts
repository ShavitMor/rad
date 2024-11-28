export interface Order {
    id?: string; // Optional for new orders
    userId: string; // ID of the user placing the order
    products: {
        productName: string; // ID of the product
        quantityKg: number; // Quantity in kilograms
    }[];
    totalPrice?: number; // Optional, can be calculated based on product prices and quantities
    createdAt?: Date; // Optional, can be set to the current date when the order is created
}
