package ar.edu.iua.stepDefinitions;

import ar.edu.iua.business.OrdenBusiness;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.junit.jupiter.api.Assertions;

public class MyStepdefs {

    OrdenBusiness ordenBusiness = new OrdenBusiness();
    Integer tamanio;
    double sumatoria;
    double promedio;

    @Given("^Tener un tamaño de password$")
    public void tenerUnTamañoDePassword() {
    }

    @When("^Paso un tamaño de contraseña (\\d+)$")
    public void pasoUnTamañoDeContraseña(int tamanio) {
        this.tamanio = tamanio;
    }

    @Then("^El tamanio de la contrasenia es 5$")
    public void elTamanioDeLaContraseniaEs() {

        String pass = ordenBusiness.generarRandomPassword(tamanio);
        Assertions.assertSame(pass.length(), tamanio);
    }

    @Given("^Tener la sumatoria de valores y tener la cantidad de valores$")
    public void tenerLaSumatoriaDeValoresYTenerLaCantidadDeValores() {
    }

    @When("^Paso una sumatoria total igual a (\\d+) y (\\d+) valores$")
    public void pasoUnaSumatoriaTotalIgualAYValores(double sumatoria, double promedio) {
        this.sumatoria = sumatoria;
        this.promedio = promedio;
    }

    @Then("^El promedio es 10$")
    public void elPromedioEs() {
        double resultado = ordenBusiness.calcularPromedio(sumatoria, promedio);
        Assertions.assertEquals(resultado, (sumatoria/promedio));
    }
}
