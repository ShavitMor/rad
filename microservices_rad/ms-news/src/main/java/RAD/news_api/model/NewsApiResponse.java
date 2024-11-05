package RAD.news_api.model;

import lombok.Data;

import java.util.List;

@Data
public class NewsApiResponse {
    private int totalArticles; // This field is now included
    private List<News> articles;

    // Default constructor
    public NewsApiResponse() {}


}
