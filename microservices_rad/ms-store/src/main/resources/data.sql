-- Creating 'products' table
CREATE TABLE IF NOT EXISTS products (
                                        id SERIAL PRIMARY KEY,
                                        name VARCHAR(255) NOT NULL,
    description TEXT,
    pricePerKg DECIMAL(10, 2) NOT NULL
    );

