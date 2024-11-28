package RAD.store.controller;

import RAD.store.exception.InvalidOrderInputException;
import RAD.store.model.Order;
import RAD.store.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        logger.info("Creating new order with details: {}", order);
        Order createdOrder = orderService.createOrder(order);
        logger.info("Order created successfully with ID: {}", createdOrder.getId());
        return ResponseEntity.ok(createdOrder);
    }

    @GetMapping
    public List<Order> getAllOrders() {
        logger.info("Retrieving all orders");
        System.out.println(orderService.getAllOrders());
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        logger.info("Retrieving order with ID: {}", id);
        return orderService.getOrderById(id)
                .map(order -> {
                    logger.info("Order found with ID: {}", id);
                    return ResponseEntity.ok(order);
                })
                .orElseGet(() -> {
                    logger.warn("Order with ID: {} not found", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order orderDetails) {
        logger.info("Updating order with ID: {}", id);
        Order updatedOrder = orderService.updateOrder(id, orderDetails);
        logger.info("Order updated successfully with ID: {}", id);
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        logger.info("Deleting order with ID: {}", id);
        orderService.deleteOrder(id);
        logger.info("Order deleted successfully with ID: {}", id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{organization}")
    public ResponseEntity<Void> createSchemas(@PathVariable String organization) {
        logger.info("Creating schemas for organization: {}", organization);
        orderService.createSchemas(organization);
        logger.info("Schemas created successfully for organization: {}", organization);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/schemas/{organization}")
    public ResponseEntity<Void> deleteSchemas(@PathVariable String organization) {
        logger.info("Deleting schemas for organization: {}", organization);
        orderService.deleteSchemas(organization);
        logger.info("Schemas deleted successfully for organization: {}", organization);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/schemas/{organization}")
    public ResponseEntity<Void> renameSchemas(@PathVariable String organization, @RequestParam String newName) {
        try {
            orderService.renameSchemas(organization, newName);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Error renaming schemas for organization {}", organization, e);
            return ResponseEntity.badRequest().build();
        }
    }
}