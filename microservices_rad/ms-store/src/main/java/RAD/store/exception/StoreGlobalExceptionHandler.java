package RAD.store.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class StoreGlobalExceptionHandler {

    @ExceptionHandler(InvalidOrderInputException.class)
    public ResponseEntity<String> handleInvalidOrganizationInputException(InvalidOrderInputException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(InvalidProductInputException.class)
    public ResponseEntity<String> handleInvalidOProductInputException(InvalidProductInputException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
}
