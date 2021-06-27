package ar.edu.iua.business;

import ar.edu.iua.business.exception.BusinessException;
import ar.edu.iua.business.exception.NotFoundException;
import ar.edu.iua.model.Conciliacion;
import ar.edu.iua.model.persistence.ConciliacionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConciliacionBusiness implements IConciliacionBusiness {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private ConciliacionRepository conciliacionDAO;
    @Autowired
    private IOrdenBusiness ordenBusiness;

    @Override
    public Conciliacion load(Long id) throws BusinessException, NotFoundException {
        Optional<Conciliacion> op;
        try {
            op = conciliacionDAO.findById(id);
        } catch (Exception e) {
            throw new BusinessException(e);
        }
        if (!op.isPresent())
            throw new NotFoundException("No se encuentra la conciliacion id=" + id);
        return op.get();
    }

    @Override
    public List<Conciliacion> list() throws BusinessException {
        try {
            return conciliacionDAO.findAll();
        } catch (Exception e) {
            throw new BusinessException(e);
        }
    }

    @Override
    public Conciliacion save(Conciliacion producto) throws BusinessException {
        try {
            return conciliacionDAO.save(producto);
        } catch (Exception e) {
            throw new BusinessException(e);
        }
    }

    @Override
    public void delete(Long id) throws BusinessException, NotFoundException {
        try {
            conciliacionDAO.deleteById(id);
        } catch (EmptyResultDataAccessException e1) {
            throw new NotFoundException("No se encuentra el producto id=" + id);
        } catch (Exception e) {
            throw new BusinessException(e);
        }
    }

    @Override
    public Conciliacion getConciliacionByNumeroOrden(String numerOrden) throws BusinessException, NotFoundException {
        Conciliacion conciliacion = null;
        try {
            conciliacion = conciliacionDAO.findByNumeroOrden(numerOrden);
        } catch (Exception e) {
            throw new BusinessException(e);
        }
        if (conciliacion == null)
            throw new NotFoundException("No se encuentran datos para ese numero de orden.");
        return conciliacion;
    }
}
