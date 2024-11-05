package RAD.news_api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import RAD.news_api.model.News;
import RAD.news_api.model.NewsApiResponse;
import RAD.news_api.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class NewsService {

    @Value("${external.api.url}")
    private String apiUrl;

    private static final Logger logger = LoggerFactory.getLogger(NewsService.class);

    private final NewsRepository newsRepository;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public NewsService(NewsRepository newsRepository, RestTemplate restTemplate ,ObjectMapper objectMapper) {
        this.newsRepository = newsRepository;
        this.restTemplate=restTemplate;
        this.objectMapper = objectMapper;

    }

    public void fetchAndStoreNews() throws JsonProcessingException {
        logger.info("Fetching news from external API");
        try {
            String response = restTemplate.getForObject(apiUrl, String.class);
            System.out.println(response);
            NewsApiResponse newsApiResponse = objectMapper.readValue(response, NewsApiResponse.class);

            List<News> news = newsApiResponse.getArticles();

            newsRepository.saveAll(news);
            logger.info("News saved successfully");
        }
        catch (Exception e){
            logger.error("Failed to fetch news from external API", e);
        }
    }

    // Create a new news entry
    public News createNews(News news) {
        return newsRepository.save(news);
    }

    // Get all news entries
    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    // Get a single news entry by ID
    public Optional<News> getNewsById(String id) {
        return newsRepository.findById(id);
    }

    // Update an existing news entry
    public Optional<News> updateNews(String id, News updatedNews) {
        return newsRepository.findById(id).map(news -> {
            news.setTitle(updatedNews.getTitle());
            news.setContent(updatedNews.getContent());
            news.setDescription(updatedNews.getDescription());
            news.setPublishedAt(updatedNews.getPublishedAt());
            news.setSource(updatedNews.getSource());
            return newsRepository.save(news);
        });
    }

    // Delete a specific news entry
    public void deleteNews(String id) {
        newsRepository.deleteById(id);
    }

    public boolean existsByTitle(String title) {
        return newsRepository.existsByTitle(title);
    }
}
