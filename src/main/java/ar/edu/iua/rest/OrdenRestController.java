package ar.edu.iua.rest;

import ar.edu.iua.business.IOrdenBusiness;
import ar.edu.iua.business.exception.*;
import ar.edu.iua.model.DTO.ActualizacionMailDTO;
import ar.edu.iua.model.Orden;
import ar.edu.iua.model.DTO.OrdenSurtidorDTO;
import ar.edu.iua.model.DTO.PesajeDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping(value = Constantes.URL_ORDENES)
public class OrdenRestController extends BaseRestController {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private IOrdenBusiness ordenBusiness;

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @GetMapping(value = {""}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity list(HttpServletRequest request) {
        try {
            return new ResponseEntity<List<Orden>>(ordenBusiness.list(), HttpStatus.OK);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            return new CustomResponseExceptionHandler().handleBusinessException(e, request);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = {""}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity add(@RequestBody Orden orden, HttpServletRequest request) {
        try {
            ordenBusiness.save(orden);
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("location", Constantes.URL_ORDENES + "/" + orden.getId());
            return new ResponseEntity<String>(responseHeaders, HttpStatus.CREATED);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            return new CustomResponseExceptionHandler().handleBusinessException(e, request);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(value = {""}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity update(@RequestBody Orden orden, HttpServletRequest request) {
        try {
            ordenBusiness.save(orden);
            return new ResponseEntity<String>(HttpStatus.OK);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            return new CustomResponseExceptionHandler().handleBusinessException(e, request);
        }
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @GetMapping(value = {"/{id}"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity load(@PathVariable("id") Long id, HttpServletRequest request) {
        try {
            return new ResponseEntity<Orden>(ordenBusiness.load(id), HttpStatus.OK);
        } catch (NotFoundException e) {
            return new CustomResponseExceptionHandler().handleNotFoundException(e, request);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            return new CustomResponseExceptionHandler().handleBusinessException(e, request);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(value = {"/{id}"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity delete(@PathVariable("id") Long id, HttpServletRequest request) {
        try {
            ordenBusiness.delete(id);
            return new ResponseEntity<String>(HttpStatus.OK);
        } catch (NotFoundException e) {
            return new CustomResponseExceptionHandler().handleNotFoundException(e, request);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            return new CustomResponseExceptionHandler().handleBusinessException(e, request);
        }
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @PutMapping(value = "surtidor", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity actualizarSurtidor(@RequestBody OrdenSurtidorDTO ordenSurtidorDTO, HttpServletRequest request) {
        Orden p = null;
        try {
            p = ordenBusiness.actualizarSurtidor(ordenSurtidorDTO);
            return new ResponseEntity<Orden>(p, HttpStatus.OK);
        } catch (InvalidPasswordOrderException e) {
            return new CustomResponseExceptionHandler().handleInvalidPasswordOrderException(e, request);
        } catch (PresetLimitException e) {
            return new CustomResponseExceptionHandler().handlePresetLimitException(e, request);
        } catch (FullTankException e) {
            return new CustomResponseExceptionHandler().handleFullTankException(e, request);
        } catch (InvalidStateOrderException e) {
            return new CustomResponseExceptionHandler().handleInvalidStateOrderException(e, request);
        } catch (OutOfDateException e) {
            return new CustomResponseExceptionHandler().handleOutOfDateException(e, request);
        } catch (NotFoundException e) {
            return new CustomResponseExceptionHandler().handleNotFoundException(e, request);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            return new CustomResponseExceptionHandler().handleBusinessException(e, request);
        }
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @PutMapping(value = "pesajeInicial", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity actualizarPesajeInicial(@RequestBody PesajeDTO pesajeDTO, HttpServletRequest request) {
        Orden p = null;
        try {
            p = ordenBusiness.actualizarPesajeInicial(pesajeDTO);
            return new ResponseEntity<Orden>(p, HttpStatus.OK);
        } catch (InvalidStateOrderException e) {
            return new CustomResponseExceptionHandler().handleInvalidStateOrderException(e, request);
        } catch (OutOfDateException e) {
            return new CustomResponseExceptionHandler().handleOutOfDateException(e, request);
        } catch (NotFoundException e) {
            return new CustomResponseExceptionHandler().handleNotFoundException(e, request);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            return new CustomResponseExceptionHandler().handleBusinessException(e, request);
        }
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @PutMapping(value = "cerrarOrden", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity cerrarOrden(@RequestBody OrdenSurtidorDTO orden, HttpServletRequest request) {
        Orden p = null;
        try {
            p = ordenBusiness.cerrarOrdenPorNumeroOrden(orden);
            return new ResponseEntity<Orden>(p, HttpStatus.OK);
        } catch (InvalidStateOrderException e) {
            return new CustomResponseExceptionHandler().handleInvalidStateOrderException(e, request);
        } catch (NotFoundException e) {
            return new CustomResponseExceptionHandler().handleNotFoundException(e, request);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            return new CustomResponseExceptionHandler().handleBusinessException(e, request);
        }
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @PutMapping(value = "pesajeFinal", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity actualizarPesajeFinal(@RequestBody PesajeDTO pesajeDTO, HttpServletRequest request) {
        Orden p = null;
        try {
            p = ordenBusiness.actualizarPesajeFinal(pesajeDTO);
            return new ResponseEntity<Orden>(p, HttpStatus.OK);
        } catch (InvalidStateOrderException e) {
            return new CustomResponseExceptionHandler().handleInvalidStateOrderException(e, request);
        } catch (NotFoundException e) {
            return new CustomResponseExceptionHandler().handleNotFoundException(e, request);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            return new CustomResponseExceptionHandler().handleBusinessException(e, request);
        }
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @PutMapping(value = "mail", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity actualizacionEnvioMail(@RequestBody ActualizacionMailDTO actualizacionMailDTO, HttpServletRequest request) {
        Orden p = null;
        try {
            p = ordenBusiness.actualizacionEnvioMail(actualizacionMailDTO);
            return new ResponseEntity<Orden>(p, HttpStatus.OK);
        } catch (NotFoundException e) {
            return new CustomResponseExceptionHandler().handleNotFoundException(e, request);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            return new CustomResponseExceptionHandler().handleBusinessException(e, request);
        }
    }
}