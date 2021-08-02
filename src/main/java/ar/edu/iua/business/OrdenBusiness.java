package ar.edu.iua.business;

import ar.edu.iua.business.exception.*;
import ar.edu.iua.model.*;
import ar.edu.iua.model.DTO.ActualizacionMailDTO;
import ar.edu.iua.model.DTO.OrdenSurtidorDTO;
import ar.edu.iua.model.DTO.PesajeDTO;
import ar.edu.iua.model.persistence.OrdenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrdenBusiness implements IOrdenBusiness {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private OrdenRepository ordenDAO;
    @Autowired
    private OrdenDetalleBusiness ordenDetalleBusiness;
    @Autowired
    private ConciliacionBusiness conciliacionBusiness;
    @Autowired
    private CisternaBusiness cisternaBusiness;
    @Autowired
    private MailService mailService;

    @Override
    public Orden load(Long id) throws BusinessException, NotFoundException {
        Optional<Orden> op;
        try {
            op = ordenDAO.findById(id);
        } catch (Exception e) {
            throw new BusinessException(e);
        }
        if (!op.isPresent())
            throw new NotFoundException("No se encuentra el orden id=" + id);
        return op.get();
    }

    @Override
    public List<Orden> list() throws BusinessException {
        try {
            return ordenDAO.findAll();
        } catch (Exception e) {
            throw new BusinessException(e);
        }
    }

    @Override
    public Orden save(Orden orden) throws BusinessException {
        try {
            orden.setEstado(1);
            orden.setCaudal(0);
            orden.setDensidad(0);
            Date fechaGen = java.util.Calendar.getInstance().getTime();
            orden.setFechaGeneracionOrden(fechaGen);
            orden.setFechaInicioCarga(null);
            orden.setFechaUltimoAlmacenamiento(null);
            orden.setMasaAcumulada(0);
            orden.setTemperatura(0);
            orden.setPassword("");
            orden.setPesajeInicial(0);
            orden.setFechaPesaje(null);
            orden.setEnvioMail(0);
            List<Cisterna> cisternas = new ArrayList<Cisterna>();
            for (int i = 0; i < orden.getCamion().getCisternaList().size(); i++) {
                Cisterna cisterna = cisternaBusiness.findCisternaByCapacidad(orden.getCamion().getCisternaList().get(i).getCapacidad());
                if (cisterna != null) {
                    cisternas.add(cisterna);
                } else {
                    cisternas.add(orden.getCamion().getCisternaList().get(i));
                }
            }
            orden.getCamion().setCisternaList(cisternas);
            return ordenDAO.save(orden);
        } catch (Exception e) {
            throw new BusinessException(e);
        }
    }

    @Override
    public void delete(Long id) throws BusinessException, NotFoundException {
        try {
            ordenDAO.deleteById(id);
        } catch (EmptyResultDataAccessException e1) {
            throw new NotFoundException("No se encuentra el orden id=" + id);
        } catch (Exception e) {
            throw new BusinessException(e);
        }
    }

    @Override
    public Orden actualizarSurtidor(OrdenSurtidorDTO ordenSurtidorDTO) throws BusinessException,
            NotFoundException, InvalidStateOrderException, InvalidPasswordOrderException,
            FullTankException, PresetLimitException, OutOfDateException {
        Orden orden = null;
        try {
            orden = findByNumeroOrden(ordenSurtidorDTO.getIdOrden());
            String fechaPrevistaCarga = orden.getFechaPrevistaCarga().toString().split(" ")[0].trim();
            String fechaSurtidor = ordenSurtidorDTO.getFecha().split("T")[0].trim();
            if (!fechaPrevistaCarga.equals(fechaSurtidor)) {
                throw new OutOfDateException("No es el dia de carga");
            }
            if (!orden.getPassword().equals(ordenSurtidorDTO.getPassword())) {
                throw new InvalidPasswordOrderException("Password Inválido");
            }
            if (orden.getEstado() == 3) {
                throw new InvalidStateOrderException("Orden cerrada.");
            } else if (orden.getEstado() != 2) {
                throw new InvalidStateOrderException("La orden no se encuentra en estado 2.");
            }
            double capacidad = 0;
            for (Cisterna c : orden.getCamion().getCisternaList()) {
                capacidad += c.getCapacidad();
            }
            if (ordenSurtidorDTO.getMasaAcumulada() > capacidad || ordenSurtidorDTO.getMasaAcumulada() > orden.getPreset()) {
                orden = cerrarOrden(orden.getId());
                return orden;
            }
            if (ordenSurtidorDTO.getMasaAcumulada() > capacidad) {
                throw new FullTankException("No se puede cargar mas combustible, se excede la capacidad del camion");
            }
            if (ordenSurtidorDTO.getMasaAcumulada() > orden.getPreset()) {
                throw new PresetLimitException("No se puede cargar mas combustible, se excede el preset");
            }
            DateFormat inputDF = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
            Date dateSurtidor = inputDF.parse(ordenSurtidorDTO.getFecha());
            double caudal = (ordenSurtidorDTO.getMasaAcumulada() - orden.getMasaAcumulada()) / 1;
            double densidad = ordenSurtidorDTO.getMasaAcumulada() / capacidad;

            // Setear fechaInicioCarga
            if (orden.getFechaInicioCarga() == null) {
                Date fechaInicioCarga = java.util.Calendar.getInstance().getTime();
                orden.setFechaInicioCarga(fechaInicioCarga);
            }

            OrdenDetalle ordenDetalle = new OrdenDetalle(ordenSurtidorDTO.getMasaAcumulada(), densidad, ordenSurtidorDTO.getTemperatura(), caudal, orden.getId(), dateSurtidor);
            if (caudal > 0 && orden.getMasaAcumulada() < ordenSurtidorDTO.getMasaAcumulada() && ordenSurtidorDTO.getMasaAcumulada() > 0) {
                if (orden.getFechaUltimoAlmacenamiento() != null) {
                    if (orden.getTiempoAlmacenaje() != 0) {
                        if ((dateSurtidor.getTime() - orden.getFechaUltimoAlmacenamiento().getTime()) >= orden.getTiempoAlmacenaje()) {
                            ordenDetalleBusiness.save(ordenDetalle);
                            ordenDAO.actualizarOrdenSurtidorConFecha(orden.getId(), caudal, densidad, ordenSurtidorDTO.getTemperatura(), ordenSurtidorDTO.getMasaAcumulada(), dateSurtidor);
                            orden = load(orden.getId());
                        } else {
                            ordenDAO.actualizarOrdenSurtidor(orden.getId(), caudal, densidad, ordenSurtidorDTO.getTemperatura(), ordenSurtidorDTO.getMasaAcumulada());
                            orden = load(orden.getId());
                        }
                    } else {
                        ordenDetalleBusiness.save(ordenDetalle);
                        ordenDAO.actualizarOrdenSurtidorConFecha(orden.getId(), caudal, densidad, ordenSurtidorDTO.getTemperatura(), ordenSurtidorDTO.getMasaAcumulada(), dateSurtidor);
                        orden = load(orden.getId());
                    }
                } else {
                    ordenDetalleBusiness.save(ordenDetalle);
                    ordenDAO.actualizarOrdenSurtidorConFecha(orden.getId(), caudal, densidad, ordenSurtidorDTO.getTemperatura(), ordenSurtidorDTO.getMasaAcumulada(), dateSurtidor);
                    orden = load(orden.getId());
                }
            }
        } catch (InvalidStateOrderException e) {
            log.error(e.getMessage(), e);
            throw new InvalidStateOrderException("La orden no se encuentra en estado 2.");
        } catch (InvalidPasswordOrderException e) {
            log.error(e.getMessage(), e);
            throw new InvalidPasswordOrderException("Password Inválido");
        } catch (FullTankException e) {
            log.error(e.getMessage(), e);
            throw new FullTankException("No se puede cargar mas combustible, se excede la capacidad del camion");
        } catch (PresetLimitException e) {
            log.error(e.getMessage(), e);
            throw new PresetLimitException("No se puede cargar mas combustible, se excede el preset");
        } catch (OutOfDateException e) {
            log.error(e.getMessage(), e);
            throw new OutOfDateException("No es el dia de carga");
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new BusinessException(e);
        }
        if (orden == null) {
            throw new NotFoundException("No se encontro ningun producto cn el filtro especificado.");
        }
        if (ordenSurtidorDTO.getTemperatura() >= 40 && orden.getEnvioMail() == 0) {
            String titulo = "Alerta de temperatura ALTA.";
            String mensaje = "La temperatura del surtidor superó los 40 grados. Temperatura actual: " + ordenSurtidorDTO.getTemperatura();
            mailService.enviarCorreo(orden.getCliente().getEmail(), titulo, mensaje);
            ordenDAO.actualizarEnvioMail(orden.getId(), 1);
            orden = load(orden.getId());
        }
        return orden;
    }

    public Orden findByNumeroOrden(String orden) throws BusinessException, NotFoundException {
        Orden order = null;
        try {
            order = ordenDAO.findByNumeroOrden(orden);
        } catch (Exception e) {
            throw new BusinessException(e);
        }
        if (order == null) {
            throw new NotFoundException("No se encontro ningun producto cn el filtro especificado.");
        }
        return order;
    }

    @Override
    public Orden actualizarPesajeInicial(PesajeDTO pesajeDTO) throws BusinessException, NotFoundException, InvalidStateOrderException {
        Orden orden = null;
        try {
            orden = findByNumeroOrden(pesajeDTO.getIdOrden());
            if (orden.getEstado() != 1) {
                throw new InvalidStateOrderException("La orden no se encuentra en estado 1.");
            }
            Date dateSurtidor = java.util.Calendar.getInstance().getTime();
            String password = generarRandomPassword(5);
            ordenDAO.actualizarPesajeInicial(pesajeDTO.getIdOrden(), pesajeDTO.getPeso(), dateSurtidor, 2, password);
            orden = load(orden.getId());
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            throw new BusinessException(e);
        } catch (InvalidStateOrderException e) {
            log.error(e.getMessage(), e);
            throw new InvalidStateOrderException("La orden no se encuentra en estado 1.");
        }
        if (orden == null) {
            throw new NotFoundException("No se encontro ningun producto cn el filtro especificado.");
        }
        return orden;
    }

    public String generarRandomPassword(int len) {
        final String caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < len; i++) {
            int randomIndex = random.nextInt(caracteres.length());
            sb.append(caracteres.charAt(randomIndex));
        }
        return sb.toString();
    }

    public Orden cerrarOrden(long idOrden) throws BusinessException, NotFoundException, InvalidStateOrderException {
        Orden orden = null;
        try {
            orden = load(idOrden);
            if (orden.getEstado() >= 3) {
                throw new InvalidStateOrderException("La orden ya fue cerrada.");
            } else if (orden.getEstado() == 2) {
                ordenDAO.cerrarOrden(idOrden);
                orden = load(orden.getId());
            } else {
                throw new InvalidStateOrderException("La orden debe estar en estado 2.");
            }
        } catch (InvalidStateOrderException e) {
            log.error(e.getMessage(), e);
            throw new InvalidStateOrderException(e);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            throw new BusinessException(e);
        }
        if (orden == null) {
            throw new NotFoundException("No se encontro ningun producto cn el filtro especificado.");
        }
        return orden;
    }

    @Override
    public Orden cerrarOrdenPorNumeroOrden(OrdenSurtidorDTO ordenDTO) throws BusinessException, NotFoundException, InvalidStateOrderException {
        Orden orden = null;
        try {
            orden = findByNumeroOrden(ordenDTO.getIdOrden());
            if (orden.getEstado() >= 3) {
                throw new InvalidStateOrderException("La orden ya fue cerrada.");
            } else if (orden.getEstado() == 2) {
                ordenDAO.cerrarOrdenPorNumeroOrden(ordenDTO.getIdOrden());
                orden = load(orden.getId());
            } else {
                throw new InvalidStateOrderException("La orden debe estar en estado 2.");
            }
        } catch (InvalidStateOrderException e) {
            log.error(e.getMessage(), e);
            throw new InvalidStateOrderException(e);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            throw new BusinessException(e);
        }
        if (orden == null) {
            throw new NotFoundException("No se encontro ningun producto cn el filtro especificado.");
        }
        return orden;
    }

    @Override
    public Orden actualizarPesajeFinal(PesajeDTO pesajeDTO) throws BusinessException, NotFoundException, InvalidStateOrderException {
        Orden orden = null;
        Conciliacion conciliacion = null;
        try {
            orden = findByNumeroOrden(pesajeDTO.getIdOrden());
            if (orden.getEstado() < 3) {
                throw new InvalidStateOrderException("La orden no se ha cerrado aún.");
            } else if (orden.getEstado() == 3) {
                Date dateSurtidor = java.util.Calendar.getInstance().getTime();
                ordenDAO.actualizarPesajeFinal(pesajeDTO.getIdOrden(), pesajeDTO.getPeso(), dateSurtidor, 4);
                conciliacion = calcularConciliacion(orden.getId());
                conciliacion.setNumeroOrden(pesajeDTO.getIdOrden());
                conciliacion = conciliacionBusiness.save(conciliacion);
                ordenDAO.actualizarConciliacion(orden.getId(), conciliacion.getId());
                orden = load(orden.getId());
            }
            conciliacion = orden.getConciliacion();
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            throw new BusinessException(e);
        } catch (InvalidStateOrderException e) {
            log.error(e.getMessage(), e);
            throw new InvalidStateOrderException("La orden no se ha cerrado aún.");
        }
        if (orden == null || conciliacion == null) {
            throw new NotFoundException("No se encontro ninguna orden con el filtro especificado.");
        }
        return orden;
    }

    public Conciliacion calcularConciliacion(long idOrden) throws BusinessException, NotFoundException {
        Conciliacion conciliacion = new Conciliacion();
        try {
            Orden orden = load(idOrden);
            List<OrdenDetalle> lista = ordenDetalleBusiness.getAllOrdenDetalleByIdOrden(idOrden);
            conciliacion.setPesajeInicial(orden.getPesajeInicial());
            conciliacion.setPesajeFinal(orden.getPesajeFinal());
            conciliacion.setProductoCargado(orden.getMasaAcumulada());
            double netoPorBalanza = orden.getPesajeFinal() - orden.getPesajeInicial();
            conciliacion.setNetoBalanza(netoPorBalanza);
            double diferencia = netoPorBalanza - orden.getMasaAcumulada();
            conciliacion.setDiferenciaBalanzaCaudalimetro(diferencia);
            double temperatura = 0;
            double densidad = 0;
            double caudal = 0;
            for (OrdenDetalle ordenAux : lista) {
                temperatura += ordenAux.getTemperatura();
                densidad += ordenAux.getDensidad();
                caudal += ordenAux.getCaudal();
            }
            double promTemperatura = calcularPromedio(temperatura, lista.size());
            double promDensidad = calcularPromedio(densidad, lista.size());
            double promCaudal = calcularPromedio(caudal, lista.size());
            conciliacion.setTemperatura(promTemperatura);
            conciliacion.setDensidad(promDensidad);
            conciliacion.setCaudal(promCaudal);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            throw new BusinessException(e);
        } catch (NotFoundException e) {
            log.error(e.getMessage(), e);
            throw new NotFoundException(e);
        }

        return conciliacion;
    }

    public double calcularPromedio(double valor, double cantidad) {
        return (valor / cantidad);
    }

    @Override
    public Orden actualizacionEnvioMail(ActualizacionMailDTO actualizacionMailDTO) throws BusinessException, NotFoundException {
        Orden orden = null;
        try {
            ordenDAO.actualizarEnvioMail(actualizacionMailDTO.getIdOrden(), actualizacionMailDTO.getEnvioMail());
            orden = load(actualizacionMailDTO.getIdOrden());
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            throw new BusinessException(e);
        }
        if (orden == null) {
            throw new NotFoundException("Orden no encontrada con id " + actualizacionMailDTO.getIdOrden());
        }
        return orden;
    }
}
