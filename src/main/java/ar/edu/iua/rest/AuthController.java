package ar.edu.iua.rest;

import ar.edu.iua.business.IAuthBusiness;
import ar.edu.iua.business.exception.InvalidCredentialsException;
import ar.edu.iua.business.exception.InvalidLoginUserException;
import ar.edu.iua.model.DTO.LoginUserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(Constantes.URL_LOGIN)
public class AuthController {

    @Autowired
    private IAuthBusiness authBusiness;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity login(@RequestBody LoginUserDTO loginUserDTO, HttpServletRequest request) {
        try {
            return ResponseEntity.ok(authBusiness.login(loginUserDTO));
        } catch (InvalidLoginUserException e) {
            return new CustomResponseExceptionHandler().handleInvalidLoginUserException(e, request);
        } catch (InvalidCredentialsException e) {
            return new CustomResponseExceptionHandler().handleInvalidCredentialsException(e, request);
        }
    }
}