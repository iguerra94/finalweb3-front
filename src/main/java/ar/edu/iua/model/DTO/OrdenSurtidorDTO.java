package ar.edu.iua.model.DTO;

import java.io.Serializable;


public class OrdenSurtidorDTO implements Serializable {


    private String idOrden;
    private double temperatura;
    private double masaAcumulada;
    private String fecha;
    private String password;

    public String getIdOrden() {
        return idOrden;
    }

    public void setIdOrden(String idOrden) {
        this.idOrden = idOrden;
    }

    public double getTemperatura() {
        return temperatura;
    }

    public void setTemperatura(double temperatura) {
        this.temperatura = temperatura;
    }

    public double getMasaAcumulada() {
        return masaAcumulada;
    }

    public void setMasaAcumulada(double masaAcumulada) {
        this.masaAcumulada = masaAcumulada;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public OrdenSurtidorDTO(String idOrden, double temperatura, double masaAcumulada, String password) {
        this.idOrden = idOrden;
        this.temperatura = temperatura;
        this.masaAcumulada = masaAcumulada;
        this.password = password;
    }
}
