package ar.edu.iua.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "ordenDetalle")

public class OrdenDetalle implements Serializable {

    private static final long serialVersionUID = -2222985674134742453L;

    public OrdenDetalle(double masaAcumulada, double densidad, double temperatura, double caudal, long idOrden, Date fecha) {
        this.masaAcumulada = masaAcumulada;
        this.densidad = densidad;
        this.temperatura = temperatura;
        this.caudal = caudal;
        this.idOrden = idOrden;
        this.fecha = fecha;
    }

    public OrdenDetalle() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private double masaAcumulada;

    private double densidad;

    private double temperatura;

    private double caudal;

    private Date fecha;

//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "orden_id")
//    private Orden orden;

    private long idOrden;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public double getMasaAcumulada() {
        return masaAcumulada;
    }

    public void setMasaAcumulada(double masaAcumulada) {
        this.masaAcumulada = masaAcumulada;
    }

    public double getDensidad() {
        return densidad;
    }

    public void setDensidad(double densidad) {
        this.densidad = densidad;
    }

    public double getTemperatura() {
        return temperatura;
    }

    public void setTemperatura(double temperatura) {
        this.temperatura = temperatura;
    }

    public double getCaudal() {
        return caudal;
    }

    public void setCaudal(double caudal) {
        this.caudal = caudal;
    }

//    public Orden getOrden() {
//        return orden;
//    }
//
//    public void setOrden(Orden orden) {
//        this.orden = orden;
//    }


    public long getIdOrden() {
        return idOrden;
    }

    public void setIdOrden(long idOrden) {
        this.idOrden = idOrden;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }
}
