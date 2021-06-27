package ar.edu.iua.business.exception;

public class InvalidLoginUserException extends Exception {

    public InvalidLoginUserException() {
    }

    public InvalidLoginUserException(String message) {
        super(message);
    }

    public InvalidLoginUserException(Throwable cause) {
        super(cause);
    }

    public InvalidLoginUserException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidLoginUserException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

}
