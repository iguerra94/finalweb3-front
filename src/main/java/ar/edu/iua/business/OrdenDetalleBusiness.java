package ar.edu.iua.business;

import ar.edu.iua.business.exception.BusinessException;
import ar.edu.iua.business.exception.NotFoundException;
import ar.edu.iua.model.OrdenDetalle;
import ar.edu.iua.model.persistence.OrdenDetalleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrdenDetalleBusiness implements IOrdenDetalleBusiness {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private OrdenDetalleRepository ordenDetalleDAO;

    @Override
    public OrdenDetalle load(Long id) throws BusinessException, NotFoundException {
        Optional<OrdenDetalle> op;
        try {
            op = ordenDetalleDAO.findById(id);
        } catch (Exception e) {
            throw new BusinessException(e);
        }
        if (!op.isPresent())
            throw new NotFoundException("No se encuentra el orden id=" + id);
        return op.get();
    }

    @Override
    public List<OrdenDetalle> list() throws BusinessException {
        try {
            return ordenDetalleDAO.findAll();
        } catch (Exception e) {
            throw new BusinessException(e);
        }
    }

    @Override
    public OrdenDetalle save(OrdenDetalle orden) throws BusinessException {
        try {
            return ordenDetalleDAO.save(orden);
        } catch (Exception e) {
            throw new BusinessException(e);
        }
    }

    @Override
    public void guardar(OrdenDetalle orden) throws BusinessException {
        try {
            ordenDetalleDAO.guardarOrdenDetale(orden.getIdOrden(), orden.getCaudal(), orden.getDensidad(), orden.getTemperatura(), orden.getMasaAcumulada());
        } catch (Exception e) {
            throw new BusinessException(e);
        }
    }

    @Override
    public void delete(Long id) throws BusinessException, NotFoundException {
        try {
            ordenDetalleDAO.deleteById(id);
        } catch (EmptyResultDataAccessException e1) {
            throw new NotFoundException("No se encuentra el orden id=" + id);
        } catch (Exception e) {
            throw new BusinessException(e);
        }
    }

    public List<OrdenDetalle> getAllOrdenDetalleByIdOrden(long idOrden) throws BusinessException, NotFoundException {
        List<OrdenDetalle> lista = null;
        try {
            lista = ordenDetalleDAO.findAllByIdOrden(idOrden);
        } catch (Exception e) {
            throw new BusinessException(e);
        }
        if (lista.size() == 0) {
            throw new NotFoundException("No se encontraron detalles con id de orden =" + idOrden);
        }
        return lista;
    }
}
