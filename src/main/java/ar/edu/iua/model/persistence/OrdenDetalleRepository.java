package ar.edu.iua.model.persistence;

import ar.edu.iua.model.OrdenDetalle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface OrdenDetalleRepository extends JpaRepository<OrdenDetalle, Long> {

    @Transactional
    @Query(value = "INSERT INTO orden_detalle (caudal, densidad, id_orden, masa_acumulada, temperatura) VALUES (?2, ?3, ?1, ?5, ?4);", nativeQuery = true)
    void guardarOrdenDetale(long idOrden, double caudal, double densidad, double temperatura, double masaAcumulada);

    List<OrdenDetalle> findAllByIdOrden(long idOrden);
}
