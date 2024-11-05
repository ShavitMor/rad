package RAD.covid_api.service;


import RAD.covid_api.exception.InvalidCountryInputException;
import RAD.covid_api.model.CovidData;
import RAD.covid_api.model.CovidStatisticsResponse;
import RAD.covid_api.repository.CovidRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class CovidService {

    @Value("${covid.api.url}")
    private String apiUrl;

    @Value("${covid.api.key}")
    private String apiKey;

    @Value("${covid.api.host}")
    private String apiHost;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final CovidRepository covidRepository;

    public CovidService(RestTemplate restTemplate, ObjectMapper objectMapper, CovidRepository covidRepository) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
        this.covidRepository = covidRepository;
    }

    // Fetch and store COVID statistics
    public List<CovidData> covidStatistics(String country) throws JsonProcessingException {
        if(covidRepository.findByCountry(country).isEmpty()){
            String requestUrl = apiUrl + "/statistics?country=" + country;

            HttpHeaders headers = new HttpHeaders();
            headers.set("x-rapidapi-host", apiHost);
            headers.set("x-rapidapi-key", apiKey);

            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(requestUrl, HttpMethod.GET, entity, String.class);
            // Parse JSON response to CovidStatisticsResponse
            CovidStatisticsResponse covidStats = objectMapper.readValue(response.getBody(), CovidStatisticsResponse.class);

            List<CovidData> covidDataList = covidStats.getResponse();
            if (covidDataList.isEmpty()) {
                throw new InvalidCountryInputException("No COVID data found for the specified country.");
            }
            // Save all data to MongoDB
            covidRepository.saveAll(covidDataList);

            return covidDataList;}
        else{
            return Collections.emptyList();
        }
    }

    // Add new COVID data
    public CovidData addCovidData(CovidData covidData) {
        return covidRepository.save(covidData);
    }

 public CovidData updateCovidData(String id, CovidData newData) {
    Optional<CovidData> optionalCovidData = covidRepository.findById(id);
    if (optionalCovidData.isPresent()) {
        CovidData existingData = optionalCovidData.get();
        existingData.setContinent(newData.getContinent());
        existingData.setCountry(newData.getCountry());
        existingData.setCases(newData.getCases());
        existingData.setDeaths(newData.getDeaths());
        existingData.setPopulation(newData.getPopulation());
        existingData.setTests(newData.getTests());
        covidRepository.save(existingData);
        return existingData;
    }

    return null;
}

   public boolean deleteCovidData(String id) {
    Optional<CovidData> covidData = covidRepository.findById(id);

    if (covidData.isPresent()) {
        covidRepository.delete(covidData.get());
        return true;
    }

    return false;
}


    public List<CovidData> getAllCovidData() {
        return covidRepository.findAll();
    }
}

