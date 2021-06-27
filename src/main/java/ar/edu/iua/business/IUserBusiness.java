package ar.edu.iua.business;

import ar.edu.iua.business.exception.BusinessException;
import ar.edu.iua.model.User;

public interface IUserBusiness {
    public User loadUserByToken(String authToken) throws BusinessException;
}
