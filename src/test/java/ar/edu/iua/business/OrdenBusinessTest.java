package ar.edu.iua.business;

import ar.edu.iua.business.exception.BusinessException;
import ar.edu.iua.business.exception.InvalidStateOrderException;
import ar.edu.iua.business.exception.NotFoundException;
import ar.edu.iua.model.*;
import ar.edu.iua.model.persistence.ConciliacionRepository;
import ar.edu.iua.model.persistence.OrdenRepository;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertSame;

@RunWith(SpringRunner.class)
@SpringBootTest
public class OrdenBusinessTest {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    OrdenBusiness ordenBusiness;


    @Rule
    public ExpectedException expectedEx = ExpectedException.none();

    @MockBean
    OrdenRepository ordenDAOMock;

    private static Orden orden1;
    private static Camion camion1;
    private static Chofer chofer1;
    private static Cisterna cisterna1;
    private static Cliente cliente1;
    private static Producto producto1;
    private static Conciliacion conciliacion1;

    @BeforeClass
    public static void setup() throws ParseException {
        orden1 = new Orden();
        orden1.setId(1);
        orden1.setNumeroOrden("000001");
        camion1 = new Camion();
        chofer1 = new Chofer();
        chofer1.setApellido("Manzanelli");
        chofer1.setDni(35572069);
        chofer1.setId(1);
        chofer1.setNombre("Matias");
        chofer1.setTelefono("3513979899");
        camion1.setChofer(chofer1);
        ArrayList<Cisterna> cisternas = new ArrayList<Cisterna>();
        cisterna1 = new Cisterna();
        cisterna1.setId(1);
        cisterna1.setCapacidad(5000);
        cisternas.add(cisterna1);
        camion1.setCisternaList(cisternas);
        camion1.setDominio("OSS570");
        camion1.setId(1);
        orden1.setCamion(camion1);
        cliente1 = new Cliente();
        cliente1.setApellido("Lujan");
        cliente1.setDni(35566987);
        cliente1.setId(1);
        cliente1.setNombre("Marcos");
        cliente1.setTelefono("3516998714");
        orden1.setCliente(cliente1);
        producto1 = new Producto();
        producto1.setDescripcion("gas liquido");
        producto1.setId(1L);
        producto1.setNombre("gas liquido");
        producto1.setPrecio(12.8);
        orden1.setProducto(producto1);
        conciliacion1 = new Conciliacion();
        conciliacion1.setId(1);
        conciliacion1.setCaudal(12);
        conciliacion1.setDensidad(0.8);
        conciliacion1.setTemperatura(24);
        conciliacion1.setDiferenciaBalanzaCaudalimetro(10);
        conciliacion1.setNetoBalanza(10010);
        conciliacion1.setProductoCargado(10000);
        conciliacion1.setPesajeInicial(10000);
        conciliacion1.setPesajeFinal(20010);
        conciliacion1.setNumeroOrden("000001");
        orden1.setConciliacion(conciliacion1);
        orden1.setMasaAcumulada(10000);
        orden1.setDensidad(0.8);
        orden1.setTemperatura(24);
        orden1.setCaudal(12);
        DateFormat inputDF = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
        Date dateUltimoAlmacenamiento = inputDF.parse("2020-11-20T10:40:51");
        orden1.setFechaUltimoAlmacenamiento(dateUltimoAlmacenamiento);
        orden1.setPreset(10000);
        orden1.setEstado(4);
        Date dateGeneracionOrden = inputDF.parse("2020-11-20T10:40:39.344000");
        orden1.setFechaGeneracionOrden(dateGeneracionOrden);
        Date datePrevistaCarga = inputDF.parse("2020-11-19T00:00:00");
        orden1.setFechaPrevistaCarga(datePrevistaCarga);
        orden1.setPassword("fX0gN");
        orden1.setPesajeInicial(10000);
        Date datePesajeInicial = inputDF.parse("2020-11-20T10:40:42.051000");
        orden1.setFechaPesajeInicial(datePesajeInicial);
        orden1.setTiempoAlmacenaje(10000);
        orden1.setPesajeFinal(20010);
        Date datePesajeFinal = inputDF.parse("2020-11-20T10:40:56.269000");
        orden1.setFechaPesajeFinal(datePesajeFinal);
    }

    @Test
    public void testFindByNumeroOrdenSuccess() throws BusinessException, NotFoundException {
        String numeroOrden = "000001";
        Mockito.when(ordenDAOMock.findByNumeroOrden(numeroOrden)).thenReturn(orden1);
        Orden ordenReceived = ordenBusiness.findByNumeroOrden(numeroOrden);
        assertSame(orden1.getNumeroOrden(), ordenReceived.getNumeroOrden());
    }

    @Test(expected = NotFoundException.class)
    public void testFindByNumeroOrdenNotFoundException() throws BusinessException, NotFoundException {
        long id = 128;
        ordenBusiness.load(id);
        expectedEx.expect(NotFoundException.class);
        expectedEx.expectMessage("No se encuentra la orden id=" + id);
    }

    @Test(expected = InvalidStateOrderException.class)
    public void testCerrarOrdenInvalidStateOrderException() throws BusinessException, NotFoundException, InvalidStateOrderException {
        long id = 1;
        Mockito.when(ordenDAOMock.findById(id)).thenReturn(Optional.ofNullable(orden1));
        ordenBusiness.cerrarOrden(id);
        expectedEx.expect(InvalidStateOrderException.class);
        expectedEx.expectMessage("La orden ya fue cerrada.");
    }
}
