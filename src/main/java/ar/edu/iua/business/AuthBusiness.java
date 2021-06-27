package ar.edu.iua.business;

import ar.edu.iua.business.exception.InvalidCredentialsException;
import ar.edu.iua.business.exception.InvalidLoginUserException;
import ar.edu.iua.config.TokenProvider;
import ar.edu.iua.model.AuthToken;
import ar.edu.iua.model.LoginUser;
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
    public AuthToken login(LoginUser loginUser) throws InvalidLoginUserException, InvalidCredentialsException {
        try {
            if (loginUser.getUsername().length() == 0 || loginUser.getPassword().length() == 0) {
                throw new InvalidLoginUserException("Usuario y contraseña requeridos.");
            }

            UserDetails userDetails = userDetailsService.loadUserByUsername(loginUser.getUsername());

            final Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginUser.getUsername(),
                            loginUser.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = jwtTokenUtil.generateToken(authentication);

            return new AuthToken(token);
        } catch (InvalidLoginUserException e) {
            throw new InvalidLoginUserException(e.getMessage());
        } catch (Exception e) {
            throw new InvalidCredentialsException(e.getMessage());
        }
    }

}