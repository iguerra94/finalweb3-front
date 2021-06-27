package ar.edu.iua.rest;

import ar.edu.iua.business.IConciliacionBusiness;
import ar.edu.iua.business.exception.BusinessException;
import ar.edu.iua.business.exception.NotFoundException;
import ar.edu.iua.model.Conciliacion;
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
@RequestMapping(value = Constantes.URL_CONCILIACIONES)
public class ConciliacionRestController extends BaseRestController {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private IConciliacionBusiness conciliacionBusiness;

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @GetMapping(value = {""}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity list(HttpServletRequest request) {
        try {
            return new ResponseEntity<List<Conciliacion>>(conciliacionBusiness.list(), HttpStatus.OK);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            return new CustomResponseExceptionHandler().handleBusinessException(e, request);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = {""}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity add(@RequestBody Conciliacion producto, HttpServletRequest request) {
        try {
            conciliacionBusiness.save(producto);
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("location", Constantes.URL_PRODUCTOS + "/" + producto.getId());
            return new ResponseEntity<String>(responseHeaders, HttpStatus.CREATED);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            return new CustomResponseExceptionHandler().handleBusinessException(e, request);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(value = {""}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity update(@RequestBody Conciliacion producto, HttpServletRequest request) {
        try {
            conciliacionBusiness.save(producto);
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
            return new ResponseEntity<Conciliacion>(conciliacionBusiness.load(id), HttpStatus.OK);
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
            conciliacionBusiness.delete(id);
            return new ResponseEntity<String>(HttpStatus.OK);
        } catch (NotFoundException e) {
            return new CustomResponseExceptionHandler().handleNotFoundException(e, request);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            return new CustomResponseExceptionHandler().handleBusinessException(e, request);
        }
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @GetMapping(value = {"/getConciliacion"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getConciliacionByNumeroOrden(@RequestParam("numero_orden") String numeroOrden, HttpServletRequest request) {
        try {
            return new ResponseEntity<Conciliacion>(conciliacionBusiness.getConciliacionByNumeroOrden(numeroOrden), HttpStatus.OK);
        } catch (NotFoundException e) {
            return new CustomResponseExceptionHandler().handleNotFoundException(e, request);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            return new CustomResponseExceptionHandler().handleBusinessException(e, request);
        }
    }
}
