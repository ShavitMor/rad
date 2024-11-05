package RAD.covid_api.model;

import lombok.Data;

import java.util.List;

@Data
public class CovidStatisticsResponse {
    private String get;
    private Parameters parameters;
    private List<Object> errors;
    private int results;
    private List<CovidData> response;

}

