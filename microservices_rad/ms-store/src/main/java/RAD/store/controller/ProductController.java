package RAD.store.controller;

import RAD.store.exception.InvalidProductInputException;
import RAD.store.model.Product;
import RAD.store.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        logger.info("Creating new product with details: {}", product);
        Product createdProduct = productService.createProduct(product);
        logger.info("Product created successfully with ID: {}", createdProduct.getId());
        return ResponseEntity.ok(createdProduct);
    }

    @GetMapping
    public List<Product> getAllProducts() {
        logger.info("Retrieving all products");
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        logger.info("Retrieving product with ID: {}", id);
        return productService.getProductById(id)
                .map(product -> {
                    logger.info("Product found with ID: {}", id);
                    return ResponseEntity.ok(product);
                })
                .orElseGet(() -> {
                    logger.warn("Product with ID: {} not found", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product productDetails) {
        logger.info("Updating product with ID: {}", id);
        Product updatedProduct = productService.updateProduct(id, productDetails);
        logger.info("Product updated successfully with ID: {}", id);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        logger.info("Deleting product with ID: {}", id);
        productService.deleteProduct(id);
        logger.info("Product deleted successfully with ID: {}", id);
        return ResponseEntity.noContent().build();
    }
}