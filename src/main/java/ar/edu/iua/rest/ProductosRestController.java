package ar.edu.iua.rest;

import ar.edu.iua.business.IProductoBusiness;
import ar.edu.iua.business.exception.BusinessException;
import ar.edu.iua.business.exception.NotFoundException;
import ar.edu.iua.model.Producto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = Constantes.URL_PRODUCTOS)
public class ProductosRestController extends BaseRestController {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private IProductoBusiness productoBusiness;

    @GetMapping(value = {""}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Producto>> list() {
        try {
            return new ResponseEntity<List<Producto>>(productoBusiness.list(), HttpStatus.OK);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            return new ResponseEntity<List<Producto>>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = {""}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> add(@RequestBody Producto producto) {
        try {
            productoBusiness.save(producto);
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("location", Constantes.URL_PRODUCTOS + "/" + producto.getId());
            return new ResponseEntity<String>(responseHeaders, HttpStatus.CREATED);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = {""}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> update(@RequestBody Producto producto) {
        try {
            productoBusiness.save(producto);
            return new ResponseEntity<String>(HttpStatus.OK);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = {"/{id}"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Producto> load(@PathVariable("id") Long id) {
        try {
            return new ResponseEntity<Producto>(productoBusiness.load(id), HttpStatus.OK);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            return new ResponseEntity<Producto>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (NotFoundException e) {
            return new ResponseEntity<Producto>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(value = {"/{id}"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> delete(@PathVariable("id") Long id) {
        try {
            productoBusiness.delete(id);
            return new ResponseEntity<String>(HttpStatus.OK);
        } catch (BusinessException e) {
            log.error(e.getMessage(), e);
            return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (NotFoundException e) {
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
        }
    }
}
