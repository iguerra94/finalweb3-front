package ar.edu.iua.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "cliente")
public class Cliente implements Serializable {

    private static final long serialVersionUID = -2576912123009634085L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    private String nombre;
    private String apellido;
    private long dni;
    private String telefono;
    private String email;


    @OneToMany(targetEntity = Orden.class, mappedBy = "cliente", fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Orden> ordenList;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public long getDni() {
        return dni;
    }

    public void setDni(long dni) {
        this.dni = dni;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public List<Orden> getOrdenList() {
        return ordenList;
    }

    public void setOrdenList(List<Orden> ordenList) {
        this.ordenList = ordenList;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
