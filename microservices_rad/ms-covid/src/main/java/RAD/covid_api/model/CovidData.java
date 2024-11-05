package RAD.covid_api.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "covid_statistics")
public class CovidData {

    @Id
    private String id;  // MongoDB generated ID
    private String continent;
    private String country;
    private long population;
    private Cases cases;
    private Deaths deaths;
    private Tests tests;
    private String day;
    private String time;


    public void setCases(Cases cases) {
        cases.setTotal(cases.getActive()+ cases.getRecovered());
        this.cases = cases;

    }

}
