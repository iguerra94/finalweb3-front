package ar.edu.iua.business;

import ar.edu.iua.business.exception.InvalidCredentialsException;
import ar.edu.iua.business.exception.InvalidLoginUserException;
import ar.edu.iua.config.TokenProvider;
import ar.edu.iua.model.AuthToken;
import ar.edu.iua.model.DTO.LoginUserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class AuthBusiness implements IAuthBusiness {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private TokenProvider jwtTokenUtil;

    @Override
    public AuthToken login(LoginUserDTO loginUserDTO) throws InvalidLoginUserException, InvalidCredentialsException {
        try {
            if (loginUserDTO.getUsername().length() == 0 || loginUserDTO.getPassword().length() == 0) {
                throw new InvalidLoginUserException("Usuario y contraseña requeridos.");
            }

            UserDetails userDetails = userDetailsService.loadUserByUsername(loginUserDTO.getUsername());

            final Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginUserDTO.getUsername(),
                            loginUserDTO.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = jwtTokenUtil.generateToken(authentication);

            return new AuthToken(token);
        } catch (InvalidLoginUserException e) {
            throw new InvalidLoginUserException(e.getMessage());
        } catch (Exception e) {
            throw new InvalidCredentialsException("Usuario o contraseña incorrectos.");
        }
    }

}