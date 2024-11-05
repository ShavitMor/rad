package RAD.news_api.repository;

import RAD.news_api.model.News;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepository extends MongoRepository<News, String> {
    List<News> findBySourceName(String sourceName);

    boolean existsByTitle(String title);
}
