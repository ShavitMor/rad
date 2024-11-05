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
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
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
    public ResponseEntity<Order> updateOrder(@PathVariable String id, @RequestBody Order orderDetails) {
        logger.info("Updating order with ID: {}", id);
        Order updatedOrder = orderService.updateOrder(id, orderDetails);
        logger.info("Order updated successfully with ID: {}", id);
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        logger.info("Deleting order with ID: {}", id);
        orderService.deleteOrder(id);
        logger.info("Order deleted successfully with ID: {}", id);
        return ResponseEntity.noContent().build();
    }
}