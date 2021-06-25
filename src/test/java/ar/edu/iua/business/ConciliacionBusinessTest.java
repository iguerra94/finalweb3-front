package ar.edu.iua.business;

import ar.edu.iua.business.exception.BusinessException;
import ar.edu.iua.business.exception.NotFoundException;
import ar.edu.iua.model.Conciliacion;
import ar.edu.iua.model.persistence.ConciliacionRepository;
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

import static org.junit.Assert.assertSame;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ConciliacionBusinessTest {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    ConciliacionBusiness conciliacionBusiness;


    @Rule
    public ExpectedException expectedEx = ExpectedException.none();

    @MockBean
    ConciliacionRepository conciliacionDAOMock;

    private static Conciliacion conciliacion1;


    @BeforeClass
    public static void setup() {
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
    }

    @Test
    public void testLoadSuccess() throws BusinessException, NotFoundException {
        String numeroOrden = "000001";
        Mockito.when(conciliacionDAOMock.findByNumeroOrden(numeroOrden)).thenReturn(conciliacion1);
        Conciliacion consReceived = conciliacionBusiness.getConciliacionByNumeroOrden(numeroOrden);
        assertSame(conciliacion1.getNumeroOrden(), consReceived.getNumeroOrden());
    }

    @Test(expected = ar.edu.iua.business.exception.NotFoundException.class)
    public void testLoadNotFoundException() throws BusinessException, NotFoundException {
        long id = 128;
        conciliacionBusiness.load(id);
        expectedEx.expect(ar.edu.iua.business.exception.NotFoundException.class);
        expectedEx.expectMessage("No se encuentra la conciliacion id=" + id);
    }
}
