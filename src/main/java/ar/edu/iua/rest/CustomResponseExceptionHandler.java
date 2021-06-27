package ar.edu.iua.rest;

import ar.edu.iua.business.exception.*;
import ar.edu.iua.model.CustomErrorDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@ControllerAdvice
@RestController
public class CustomResponseExceptionHandler {

    /* General Exceptions */

    @ExceptionHandler(BusinessException.class)
    public final ResponseEntity handleBusinessException(Exception ex, HttpServletRequest request) {
        CustomErrorDetails errorDetails = new CustomErrorDetails(new Date(), ex.getMessage(),
                request.getServletPath());
        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(NotFoundException.class)
    public final ResponseEntity handleNotFoundException(NotFoundException ex, HttpServletRequest request) {
        CustomErrorDetails errorDetails = new CustomErrorDetails(new Date(), ex.getMessage(),
                request.getServletPath());
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    /* Orden Exceptions */

    @ExceptionHandler(InvalidPasswordOrderException.class)
    public final ResponseEntity handleInvalidPasswordOrderException(InvalidPasswordOrderException ex, HttpServletRequest request) {
        CustomErrorDetails errorDetails = new CustomErrorDetails(new Date(), ex.getMessage(),
                request.getServletPath());
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PresetLimitException.class)
    public final ResponseEntity handlePresetLimitException(PresetLimitException ex, HttpServletRequest request) {
        CustomErrorDetails errorDetails = new CustomErrorDetails(new Date(), ex.getMessage(),
                request.getServletPath());
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(FullTankException.class)
    public final ResponseEntity handleFullTankException(FullTankException ex, HttpServletRequest request) {
        CustomErrorDetails errorDetails = new CustomErrorDetails(new Date(), ex.getMessage(),
                request.getServletPath());
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(OutOfDateException.class)
    public final ResponseEntity handleOutOfDateException(OutOfDateException ex, HttpServletRequest request) {
        CustomErrorDetails errorDetails = new CustomErrorDetails(new Date(), ex.getMessage(),
                request.getServletPath());
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidStateOrderException.class)
    public final ResponseEntity handleInvalidStateOrderException(InvalidStateOrderException ex, HttpServletRequest request) {
        CustomErrorDetails errorDetails = new CustomErrorDetails(new Date(), ex.getMessage(),
                request.getServletPath());
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    /* Auth Exceptions */

    @ExceptionHandler(InvalidLoginUserException.class)
    public final ResponseEntity handleInvalidLoginUserException(InvalidLoginUserException ex, HttpServletRequest request) {
        CustomErrorDetails errorDetails = new CustomErrorDetails(new Date(), ex.getMessage(),
                request.getServletPath());
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public final ResponseEntity handleInvalidCredentialsException(InvalidCredentialsException ex, HttpServletRequest request) {
        CustomErrorDetails errorDetails = new CustomErrorDetails(new Date(), ex.getMessage(),
                request.getServletPath());
        return new ResponseEntity<>(errorDetails, HttpStatus.FORBIDDEN);
    }
}