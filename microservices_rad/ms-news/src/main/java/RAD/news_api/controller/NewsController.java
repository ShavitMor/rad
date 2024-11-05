package RAD.news_api.controller;

import RAD.news_api.model.News;
import RAD.news_api.service.NewsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/news")
public class NewsController {

    private static final Logger logger = LoggerFactory.getLogger(NewsController.class);

    @Autowired
    private NewsService newsService;

    @GetMapping("/top-headlines")
    public String fetchNews() {
        logger.info("Fetching and storing news...");
        try {
            newsService.fetchAndStoreNews();
            logger.info("News fetched and stored successfully!");
            return "News fetched and stored successfully!";
        } catch (Exception e) {
            logger.error("Error occurred: {}", e.getMessage());
            return "Error occurred: " + e.getMessage();
        }
    }

    @PostMapping
    public ResponseEntity<News> createNews(@RequestBody News news) {
        logger.info("Creating new news entry: {}", news.getTitle());
        if (newsService.existsByTitle(news.getTitle())) {
            logger.warn("News with title '{}' already exists!", news.getTitle());
            return ResponseEntity.badRequest().build();
        }
        News createdNews = newsService.createNews(news);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdNews);
    }

    @GetMapping
    public ResponseEntity<List<News>> getAllNews() {
        logger.info("Retrieving all news entries");
        List<News> newsList = newsService.getAllNews();
        return ResponseEntity.ok(newsList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<News> getNewsById(@PathVariable String id) {
        logger.info("Retrieving news entry with ID: {}", id);
        return newsService.getNewsById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<News> updateNews(@PathVariable String id, @RequestBody News updatedNews) {
        logger.info("Updating news entry with ID: {}", id);
        return newsService.updateNews(id, updatedNews)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable String id) {
        logger.info("Deleting news entry with ID: {}", id);
        newsService.deleteNews(id);
        return ResponseEntity.noContent().build();
    }
}