package ar.edu.iua.business.exception;

public class InvalidStateOrderException extends Exception {

    public InvalidStateOrderException() {
    }

    public InvalidStateOrderException(String message) {
        super(message);
    }

    public InvalidStateOrderException(Throwable cause) {
        super(cause);
    }

    public InvalidStateOrderException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidStateOrderException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

}
