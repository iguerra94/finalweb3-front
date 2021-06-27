package ar.edu.iua.model.DTO;

import java.io.Serializable;


public class PesajeDTO implements Serializable {


    private String idOrden;
    private double peso;
    private String fechaPesaje;

    public String getIdOrden() {
        return idOrden;
    }

    public void setIdOrden(String idOrden) {
        this.idOrden = idOrden;
    }

    public double getPeso() {
        return peso;
    }

    public void setPeso(double peso) {
        this.peso = peso;
    }

    public String getFechaPesaje() {
        return fechaPesaje;
    }

    public void setFechaPesaje(String fechaPesaje) {
        this.fechaPesaje = fechaPesaje;
    }

    public PesajeDTO(String idOrden, double peso, String fechaPesaje) {
        this.idOrden = idOrden;
        this.peso = peso;
        this.fechaPesaje = fechaPesaje;
    }
}
