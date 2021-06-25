package ar.edu.iua.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "conciliacion")
public class Conciliacion implements Serializable {

    private static final long serialVersionUID = -1609250874892904470L;

    public Conciliacion(double pesajeInicial, double pesajeFinal, double netoBalanza, double diferenciaBalanzaCaudalimetro, double productoCargado, double densidad, double temperatura, double caudal) {
        this.pesajeInicial = pesajeInicial;
        this.pesajeFinal = pesajeFinal;
        this.netoBalanza = netoBalanza;
        this.diferenciaBalanzaCaudalimetro = diferenciaBalanzaCaudalimetro;
        this.productoCargado = productoCargado;
        this.densidad = densidad;
        this.temperatura = temperatura;
        this.caudal = caudal;
    }

    public Conciliacion() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonBackReference
    private long id;

    private String numeroOrden;

    private double productoCargado;

    private double densidad;

    private double temperatura;

    private double caudal;

    private double pesajeInicial;

    private double pesajeFinal;

    private double netoBalanza;

    private double diferenciaBalanzaCaudalimetro;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
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

    public double getProductoCargado() {
        return productoCargado;
    }

    public void setProductoCargado(double productoCargado) {
        this.productoCargado = productoCargado;
    }

    public double getPesajeInicial() {
        return pesajeInicial;
    }

    public void setPesajeInicial(double pesajeInicial) {
        this.pesajeInicial = pesajeInicial;
    }

    public double getPesajeFinal() {
        return pesajeFinal;
    }

    public void setPesajeFinal(double pesajeFinal) {
        this.pesajeFinal = pesajeFinal;
    }

    public double getNetoBalanza() {
        return netoBalanza;
    }

    public void setNetoBalanza(double netoBalanza) {
        this.netoBalanza = netoBalanza;
    }

    public double getDiferenciaBalanzaCaudalimetro() {
        return diferenciaBalanzaCaudalimetro;
    }

    public void setDiferenciaBalanzaCaudalimetro(double diferenciaBalanzaCaudalimetro) {
        this.diferenciaBalanzaCaudalimetro = diferenciaBalanzaCaudalimetro;
    }

    public String getNumeroOrden() {
        return numeroOrden;
    }

    public void setNumeroOrden(String numeroOrden) {
        this.numeroOrden = numeroOrden;
    }
}
