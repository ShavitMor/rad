package RAD.covid_api.repository;

import RAD.covid_api.model.CovidData;
import com.mongodb.client.model.mql.MqlArray;
import com.mongodb.client.model.mql.MqlValue;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CovidRepository extends MongoRepository<CovidData, String> {
    List<CovidData> findByCountry(String country);

}
