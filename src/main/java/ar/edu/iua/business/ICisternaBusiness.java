package ar.edu.iua.business;

import ar.edu.iua.business.exception.*;
import ar.edu.iua.model.Cisterna;
import ar.edu.iua.model.DTO.ActualizacionMailDTO;
import ar.edu.iua.model.DTO.OrdenSurtidorDTO;
import ar.edu.iua.model.DTO.PesajeDTO;
import ar.edu.iua.model.Orden;

import java.util.List;

public interface ICisternaBusiness {

    public Cisterna findCisternaByCapacidad(double capacidad) throws BusinessException, NotFoundException;
}
