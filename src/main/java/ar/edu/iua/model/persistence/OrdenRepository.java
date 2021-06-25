package ar.edu.iua.model.persistence;

import ar.edu.iua.model.Orden;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Repository
public interface OrdenRepository extends JpaRepository<Orden, Long> {

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE orden o SET o.caudal = ?2, o.densidad = ?3, o.temperatura = ?4, o.masa_acumulada = ?5, o.fecha_ultimo_almacenamiento = ?6 WHERE o.id = ?1", nativeQuery = true)
    void actualizarOrdenSurtidorConFecha(long idOrden, double caudal, double densidad, double temperatura, double masaAcumulada, Date fechaUltimoAlmacenamiento);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE orden o SET o.caudal = ?2, o.densidad = ?3, o.temperatura = ?4, o.masa_acumulada = ?5 WHERE o.id = ?1", nativeQuery = true)
    void actualizarOrdenSurtidor(long idOrden, double caudal, double densidad, double temperatura, double masaAcumulada);

    @Query(value = "select MAX(id) from orden", nativeQuery = true)
    String getUltimoIdOrden();

    Orden findByNumeroOrden(String orden);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE orden p SET p.pesaje_inicial = ?2, p.fecha_pesaje_inicial = ?3, p.estado = ?4, p.password = ?5 WHERE p.numero_orden = ?1", nativeQuery = true)
    void actualizarPesajeInicial(String idOrden, double peso, Date fechaPesaje, int estado, String password);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE orden o SET o.estado = 3 WHERE o.id = ?1", nativeQuery = true)
    void cerrarOrden(long idOrden);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE orden o SET o.estado = 3 WHERE o.numero_orden = ?1", nativeQuery = true)
    void cerrarOrdenPorNumeroOrden(String numeroOrden);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE orden p SET p.pesaje_final = ?2, p.fecha_pesaje_final = ?3, p.estado = ?4 WHERE p.numero_orden = ?1", nativeQuery = true)
    void actualizarPesajeFinal(String idOrden, double peso, Date fechaPesaje, int estado);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE orden o SET o.conciliacion_id = ?2 WHERE o.id = ?1", nativeQuery = true)
    void actualizarConciliacion(long idOrden, long idConciliacion);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE orden e SET e.envio_mail = ?2 WHERE e.id = ?1", nativeQuery = true)
    void actualizarEnvioMail(long idOrden, int envio_mail);
}
