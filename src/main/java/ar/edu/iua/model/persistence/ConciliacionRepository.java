package ar.edu.iua.model.persistence;

import ar.edu.iua.model.Conciliacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConciliacionRepository extends JpaRepository<Conciliacion, Long> {

    Conciliacion findByNumeroOrden(String numeroOrden);
}
