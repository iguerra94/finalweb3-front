package ar.edu.iua.model.persistence;

import ar.edu.iua.model.Cisterna;
import ar.edu.iua.model.OrdenDetalle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface CisternaRepository extends JpaRepository<Cisterna, Long> {

    Optional<Cisterna> findByCapacidad(double capacidad);
}
