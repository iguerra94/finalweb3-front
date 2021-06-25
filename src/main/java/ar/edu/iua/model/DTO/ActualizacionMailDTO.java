package ar.edu.iua.model.DTO;

import java.io.Serializable;


public class ActualizacionMailDTO implements Serializable {


    private long idOrden;
    private int envioMail;

    public long getIdOrden() {
        return idOrden;
    }

    public void setIdOrden(long idOrden) {
        this.idOrden = idOrden;
    }

    public int getEnvioMail() {
        return envioMail;
    }

    public void setEnvioMail(int envioMail) {
        this.envioMail = envioMail;
    }

    public ActualizacionMailDTO(long idOrden, int envioMail) {
        this.idOrden = idOrden;
        this.envioMail = envioMail;
    }
}
