package RAD.store.model;

import lombok.Data;

@Data
public class OrderProduct {
    private String productId;
    private double quantityKg;
    private double price;

}