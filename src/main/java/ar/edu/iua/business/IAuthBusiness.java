package ar.edu.iua.business;

import ar.edu.iua.business.exception.InvalidCredentialsException;
import ar.edu.iua.business.exception.InvalidLoginUserException;
import ar.edu.iua.model.AuthToken;
import ar.edu.iua.model.DTO.LoginUserDTO;

public interface IAuthBusiness {
    public AuthToken login(LoginUserDTO loginUserDTO) throws InvalidLoginUserException, InvalidCredentialsException;
}
