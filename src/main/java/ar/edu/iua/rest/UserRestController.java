package ar.edu.iua.rest;

import ar.edu.iua.business.IUserBusiness;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

import static ar.edu.iua.model.Constantes.HEADER_STRING;
import static ar.edu.iua.model.Constantes.TOKEN_PREFIX;

@RestController
@RequestMapping(value = Constantes.URL_USER)
public class UserRestController extends BaseRestController {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private IUserBusiness userBusiness;

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @GetMapping(value = "info", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity userInfo(HttpServletRequest req) {
        try {
            String header = req.getHeader(HEADER_STRING);
            String authToken;

            if (header != null && header.startsWith(TOKEN_PREFIX)) {
                authToken = header.replace(TOKEN_PREFIX,"");
                return ResponseEntity.ok(userBusiness.loadUserByToken(authToken));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
    }
}
