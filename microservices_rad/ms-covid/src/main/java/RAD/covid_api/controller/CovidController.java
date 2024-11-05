package RAD.covid_api.controller;

import RAD.covid_api.model.CovidData;
import RAD.covid_api.service.CovidService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/covid")
public class CovidController {

    private static final Logger logger = LoggerFactory.getLogger(CovidController.class);

    @Autowired
    private CovidService covidService;

    // GET: Get all COVID data
    @GetMapping("")
    public List<CovidData> getAllCovidData() {
        logger.info("Retrieving all COVID data");
        return covidService.getAllCovidData();
    }

    @GetMapping("/statistics")
    public ResponseEntity<List<CovidData>> getCovidStatistics(@RequestParam String country) throws JsonProcessingException {
        logger.info("Retrieving COVID statistics for country: {}", country);
        List<CovidData> covidDataList = covidService.covidStatistics(country);
        return ResponseEntity.ok(covidDataList);
    }

    // POST: Add new COVID data
    @PostMapping("/add")
    public ResponseEntity<CovidData> addCovidData(@RequestBody CovidData covidData) {
        logger.info("Adding new COVID data: {}", covidData);
        CovidData savedData = covidService.addCovidData(covidData);
        logger.info("COVID data added successfully with ID: {}", savedData.getId());
        return ResponseEntity.ok(savedData);
    }

    // PATCH: Update COVID data by id
    @PatchMapping("/update/{id}")
    public ResponseEntity<CovidData> updateCovidData(@PathVariable String id, @RequestBody CovidData newData) {
        logger.info("Updating COVID data with ID: {}", id);
        CovidData updatedData = covidService.updateCovidData(id, newData);

        if (updatedData != null) {
            logger.info("COVID data updated successfully with ID: {}", id);
            return ResponseEntity.ok(updatedData);
        } else {
            logger.warn("COVID data with ID: {} not found", id);
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE: Remove COVID data by id
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCovidData(@PathVariable String id) {
        logger.info("Deleting COVID data with ID: {}", id);
        boolean deleted = covidService.deleteCovidData(id);
        if (deleted) {
            logger.info("COVID data deleted successfully with ID: {}", id);
            return ResponseEntity.ok().build();
        } else {
            logger.warn("COVID data with ID: {} not found", id);
            return ResponseEntity.notFound().build();
        }
    }
}