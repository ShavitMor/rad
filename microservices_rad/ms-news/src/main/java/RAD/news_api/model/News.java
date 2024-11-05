package RAD.news_api.model;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "articles")
public class News {
    @Id
    private String id;
    private String title;
    private String description;
    private String content;
    private String url;
    private String imageUrl;
    private Date publishedAt;
    private Source source; // Updated to use Source class


}
