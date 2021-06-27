Feature: Orden feature

  Scenario: Prueba de tamanio correcto de password
    Given Tener un tamaño de password
    When Paso un tamaño de contraseña 5
    Then El tamanio de la contrasenia es 5

  Scenario: Prueba de calculo de promedios
    Given Tener la sumatoria de valores y tener la cantidad de valores
    When Paso una sumatoria total igual a 20 y 2 valores
    Then El promedio es 10