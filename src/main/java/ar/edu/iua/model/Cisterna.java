package ar.edu.iua.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "cisterna")
public class Cisterna implements Serializable {

    private static final long serialVersionUID = -1761751975510718871L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private double capacidad;

    @ManyToMany(targetEntity = Camion.class, mappedBy = "cisternaList")
    @JsonBackReference
    private List<Camion> camionList;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public double getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(double capacidad) {
        this.capacidad = capacidad;
    }

    public List<Camion> getCamionList() {
        return camionList;
    }

    public void setCamionList(List<Camion> camionList) {
        this.camionList = camionList;
    }
}