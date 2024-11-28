package RAD.store.service;

import RAD.store.exception.InvalidProductInputException;
import RAD.store.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import RAD.store.repository.ProductRepository;
import java.util.Optional;
import java.util.NoSuchElementException;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product updateProduct(Long id, Product productDetails) {
        return productRepository.findById(id).map(product -> {
            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setPricePerKg(productDetails.getPricePerKg());
            return productRepository.save(product);
        }).orElseThrow(() -> new InvalidProductInputException("Product not found"));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
