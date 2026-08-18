Feature: Login Feature
    Como usuario quiero poder iniciar secion en la aplicacion.
    Scenario: hacer login con credenciales validas
        Given Navego a la pagina de login
        And Ingreso el nombre de usuario 'standard_user'
        And Ingreso el password 'secret_sauce'
        When hago click en el boton login
        Then Se me hara navegar a la pagina de inventario
