package RAD.store.repository;

import RAD.store.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "SELECT * FROM public.products WHERE name = :name", nativeQuery = true)
    Optional<Product> findByName(@Param("name") String name);
}

