package ar.edu.iua;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("mysql")
public class PruebaPerfilMySql implements IPruebaPerfil {
    private Logger log = LoggerFactory.getLogger(IPruebaPerfil.class);

    @Override
    public void mensaje() {
        log.info("***** MYSQL *****");

    }

}
