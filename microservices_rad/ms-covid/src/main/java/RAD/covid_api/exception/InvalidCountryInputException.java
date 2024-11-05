package RAD.covid_api.exception;

public class InvalidCountryInputException extends RuntimeException {
    public InvalidCountryInputException(String message) {
        super(message);
    }

}
