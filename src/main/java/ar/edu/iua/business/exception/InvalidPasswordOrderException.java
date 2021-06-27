package ar.edu.iua.business.exception;

public class InvalidPasswordOrderException extends Exception {

    public InvalidPasswordOrderException() {
    }

    public InvalidPasswordOrderException(String message) {
        super(message);
    }

    public InvalidPasswordOrderException(Throwable cause) {
        super(cause);
    }

    public InvalidPasswordOrderException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidPasswordOrderException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

}
