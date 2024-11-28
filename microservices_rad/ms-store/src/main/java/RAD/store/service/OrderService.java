package RAD.store.service;

import RAD.store.exception.InvalidOrderInputException;
import RAD.store.exception.InvalidProductInputException;
import RAD.store.model.Order;
import RAD.store.model.OrderProduct;
import RAD.store.model.Product;
import RAD.store.repository.OrderProductRepository;
import RAD.store.repository.OrderRepository;
import RAD.store.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderProductRepository orderProductRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger log = LoggerFactory.getLogger(OrderService.class);

    public List<Order> getAllOrders() {
        // Fetch all orders
        List<Order> orders = orderRepository.findAll();

        // For each order, fetch associated order products
        for (Order order : orders) {
            List<OrderProduct> products = orderProductRepository.findByOrderId(order.getId());
            order.setProducts(products); // Set the products for this order
        }

        return orders;
    }
    public Order createOrder(Order order) {
        double totalPrice = 0.0;

        // Calculate total price and set price for each OrderProduct
        for (OrderProduct op : order.getProducts()) {
            System.out.println("yo"+op);
            Product product = productRepository.findByName(op.getProductName())
                    .orElseThrow(() -> new InvalidProductInputException("Product not found"));
            op.setPrice(product.getPricePerKg() * op.getQuantityKg());
            totalPrice += op.getPrice();
        }

        // Save the order first, so it gets an ID
        order.setTotalPrice(totalPrice);
        Order newOrder = orderRepository.save(order);

        // Set the orderId for each OrderProduct and save them
        for (OrderProduct op : order.getProducts()) {
            op.setOrderId(newOrder.getId()); // Assuming orderId is a field in OrderProduct
            orderProductRepository.save(op); // Persist each OrderProduct
        }

        return newOrder;
    }


    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Order updateOrder(Long id, Order orderDetails) {
        return orderRepository.findById(id).map(order -> {
            order.setProducts(orderDetails.getProducts());
            double totalPrice = 0.0;
            for (OrderProduct op : order.getProducts()) {
                Product product = productRepository.findByName(op.getProductName())
                        .orElseThrow(() -> new InvalidProductInputException("Product not found"));
                op.setPrice(product.getPricePerKg() * op.getQuantityKg());
                totalPrice += op.getPrice();
                orderProductRepository.save(op);

            }
            order.setTotalPrice(totalPrice);
            return orderRepository.save(order);
        }).orElseThrow(() -> new InvalidOrderInputException("Order not found"));
    }
    @Transactional
    public void deleteOrder(Long id) {
        // First, delete all OrderProduct entries associated with the Order
        orderProductRepository.deleteByOrderId(id);

        // Then, delete the Order itself
        orderRepository.deleteById(id);
    }
    public void createSchemas(String organization) {
        String schemaName = sanitizeSchemaName(organization);

        // Create schema
        String createSchemaSQL = String.format("CREATE SCHEMA %s", schemaName);
        jdbcTemplate.execute(createSchemaSQL);
        log.info("Created schema: {}", schemaName);

        // Create orders table
        String createOrdersTableSQL = String.format("""
        CREATE TABLE %s.orders (
            id SERIAL PRIMARY KEY,
            userid TEXT,
            totalprice DOUBLE PRECISION,
            createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
    """, schemaName);
        jdbcTemplate.execute(createOrdersTableSQL);
        log.info("Created orders table in schema: {}", schemaName);

        // Create order_products table
        String createOrderProductsTableSQL = String.format("""
        CREATE TABLE %s.order_products (
            id SERIAL PRIMARY KEY,
            orderid BIGINT,
            productname TEXT,
            quantitykg DOUBLE PRECISION,
            price DOUBLE PRECISION
        )
    """, schemaName);
        jdbcTemplate.execute(createOrderProductsTableSQL);
        log.info("Created order_products table in schema: {}", schemaName);
    }

    private String sanitizeSchemaName(String organization) {
        // Convert to lowercase and replace spaces/special chars with underscores
        String sanitized = organization.toLowerCase()
                .replaceAll("[^a-z0-9]", "_")
                .replaceAll("_{2,}", "_")
                .replaceAll("^_|_$", "");

        // Ensure it starts with a letter (PostgreSQL requirement)
        if (!sanitized.matches("^[a-z].*")) {
            sanitized = "org_" + sanitized;
        }

        return sanitized;
    }

    public void deleteSchemas(String organization) {
        // Sanitize the schema name
        String schemaName = sanitizeSchemaName(organization);

        // Drop order_products table
        String dropOrderProductsTableSQL = String.format("DROP TABLE IF EXISTS %s.order_products CASCADE", schemaName);
        jdbcTemplate.execute(dropOrderProductsTableSQL);
        log.info("Dropped order_products table in schema: {}", schemaName);

        // Drop orders table
        String dropOrdersTableSQL = String.format("DROP TABLE IF EXISTS %s.orders CASCADE", schemaName);
        jdbcTemplate.execute(dropOrdersTableSQL);
        log.info("Dropped orders table in schema: {}", schemaName);

        // Drop schema
        String dropSchemaSQL = String.format("DROP SCHEMA IF EXISTS %s CASCADE", schemaName);
        jdbcTemplate.execute(dropSchemaSQL);
        log.info("Dropped schema: {}", schemaName);
    }

    public void renameSchemas(String organization, String newName) {
        String oldSchemaName = sanitizeSchemaName(organization);
        String newSchemaName = sanitizeSchemaName(newName);

        if (oldSchemaName.equals(newSchemaName)) {
            throw new InvalidOrderInputException("New name must be different from the old name");
        }

        // Check if schema with the new name already exists
        String checkSchemaSQL = "SELECT COUNT(*) FROM information_schema.schemata WHERE schema_name = ?";
        Integer count = jdbcTemplate.queryForObject(checkSchemaSQL, Integer.class, newSchemaName);
        if (count != null && count > 0) {
            throw new InvalidOrderInputException("Schema with the name '" + newSchemaName + "' already exists");
        }

        // Rename the schema
        String renameSchemaSQL = String.format("ALTER SCHEMA %s RENAME TO %s", oldSchemaName, newSchemaName);
        jdbcTemplate.execute(renameSchemaSQL);
        log.info("Renamed schema from '{}' to '{}'", oldSchemaName, newSchemaName);

        // Optionally, update any references to the schema in other tables if necessary
        // For example, you might need to update any foreign keys referencing the old schema
    }
}
