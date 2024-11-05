package RAD.covid_api.model;
import lombok.Data;

@Data
public class Cases {
    private String newCases;
    private int active;
    private Integer critical;
    private long recovered;
    private String per1Mpop;
    private long total;


}
