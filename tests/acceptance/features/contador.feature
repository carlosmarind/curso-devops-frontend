Feature: Contador Simple
    El usuario desea usar el contador para incrementar o drecrementar un valor en la pagina
    Scenario: El contador es incrementado
        Given el usuario visita el sitio home
        When el usuario hace click en el boton +
        Then el usuario ve el contador incrementarse en una unidad
    Scenario: El contador es decrementado
        Given el usuario visita el sitio home
        When el usuario hace click en el boton -
        Then el usuario ve el contador reducirse en una unidad