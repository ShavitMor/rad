package RAD.covid_api.model;

import lombok.Data;

@Data
public class Deaths {
    private String newDeaths;
    private String per1Mpop;
    private long total;


}
