package RAD.store.service;

import RAD.store.exception.InvalidOrderInputException;
import RAD.store.exception.InvalidProductInputException;
import RAD.store.model.Order;
import RAD.store.model.OrderProduct;
import RAD.store.model.Product;
import RAD.store.repository.OrderRepository;
import RAD.store.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    public Order createOrder(Order order) {
        double totalPrice = 0.0;

        for (OrderProduct op : order.getProducts()) {
            Product product = productRepository.findById(op.getProductId())
                    .orElseThrow(() -> new InvalidProductInputException("Product not found"));
            op.setPrice(product.getPricePerKg() * op.getQuantityKg());
            totalPrice += op.getPrice();
        }

        order.setTotalPrice(totalPrice);
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    public Order updateOrder(String id, Order orderDetails) {
        return orderRepository.findById(id).map(order -> {
            order.setUserId(orderDetails.getUserId());
            order.setProducts(orderDetails.getProducts());
            double totalPrice = 0.0;
            for (OrderProduct op : order.getProducts()) {
                Product product = productRepository.findById(op.getProductId())
                        .orElseThrow(() -> new InvalidProductInputException("Product not found"));
                op.setPrice(product.getPricePerKg() * op.getQuantityKg());
                totalPrice += op.getPrice();
            }
            order.setTotalPrice(totalPrice);
            return orderRepository.save(order);
        }).orElseThrow(() -> new InvalidOrderInputException("Order not found"));
    }

    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }
}
