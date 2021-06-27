package ar.edu.iua.business;

import ar.edu.iua.business.exception.BusinessException;
import ar.edu.iua.business.exception.NotFoundException;
import ar.edu.iua.model.OrdenDetalle;

import java.util.List;

public interface IOrdenDetalleBusiness {

    public OrdenDetalle load(Long id) throws BusinessException, NotFoundException;

    public List<OrdenDetalle> list() throws BusinessException;

    public OrdenDetalle save(OrdenDetalle orden) throws BusinessException;

    public void guardar(OrdenDetalle orden) throws BusinessException;

    public void delete(Long id) throws BusinessException, NotFoundException;
}
