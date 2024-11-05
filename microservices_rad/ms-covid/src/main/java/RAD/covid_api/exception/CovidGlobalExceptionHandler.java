package RAD.covid_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CovidGlobalExceptionHandler {

    @ExceptionHandler(InvalidCountryInputException.class)
    public ResponseEntity<String> handleInvalidCountryInputException(InvalidCountryInputException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidOrganizationInputException.class)
    public ResponseEntity<String> handleInvalidOrganizationInputException(InvalidOrganizationInputException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
}
