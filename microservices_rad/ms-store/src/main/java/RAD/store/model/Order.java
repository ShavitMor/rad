package RAD.store.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
public class Order {

    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String userId;

    private double totalPrice;

    private LocalDateTime createdAt = LocalDateTime.now();

    // Assuming OrderProduct is a separate entity or will be handled differently
    @Transient
    private List<OrderProduct> products;



}


