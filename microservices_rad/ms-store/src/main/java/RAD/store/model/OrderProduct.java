package RAD.store.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Data
@Entity
@Table(name = "order_products")
public class OrderProduct implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long orderId;

    private String productName;

    private double quantityKg;

    private double price;
}