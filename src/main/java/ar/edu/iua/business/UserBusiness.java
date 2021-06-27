package ar.edu.iua.business;

import ar.edu.iua.business.exception.BusinessException;
import ar.edu.iua.business.exception.NotFoundException;
import ar.edu.iua.config.TokenProvider;
import ar.edu.iua.dao.UserDao;
import ar.edu.iua.model.User;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service(value = "userService")
public class UserBusiness implements IUserBusiness, UserDetailsService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    @Autowired
    private TokenProvider jwtTokenUtil;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("Usuario o contraseña incorrectos.");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthority(user));
    }

    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRoles().forEach(role -> {
            //authorities.add(new SimpleGrantedAuthority(role.getName()));
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
        });
        return authorities;
        //return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }

    @Override
    public User loadUserByToken(String authToken) throws BusinessException {
        try {
            String username = jwtTokenUtil.getUsernameFromToken(authToken);

            User user = userDao.findByUsername(username);

            if (user == null){
                throw new NotFoundException("User not found");
            }

            return user;
        } catch(Exception e){
            throw new BusinessException(e);
        }
    }
}
