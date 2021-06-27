package ar.edu.iua.business.exception;

public class PresetLimitException extends Exception {


    public PresetLimitException() {
    }

    public PresetLimitException(String message) {
        super(message);
    }

    public PresetLimitException(Throwable cause) {
        super(cause);
    }

    public PresetLimitException(String message, Throwable cause) {
        super(message, cause);
    }

    public PresetLimitException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

}
