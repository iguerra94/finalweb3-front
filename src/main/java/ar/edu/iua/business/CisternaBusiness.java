package ar.edu.iua.business;

import ar.edu.iua.business.exception.BusinessException;
import ar.edu.iua.business.exception.NotFoundException;
import ar.edu.iua.model.Cisterna;
import ar.edu.iua.model.OrdenDetalle;
import ar.edu.iua.model.persistence.CisternaRepository;
import ar.edu.iua.model.persistence.OrdenDetalleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CisternaBusiness implements ICisternaBusiness {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private CisternaRepository cisternaRepository;

    @Override
    public Cisterna findCisternaByCapacidad(double capacidad) throws BusinessException, NotFoundException {
        Optional<Cisterna> op;
        try {
            op = cisternaRepository.findByCapacidad(capacidad);
        } catch (Exception e) {
            throw new BusinessException(e);
        }
        if (!op.isPresent()){
            return null;
        }
        return op.get();
    }
}
