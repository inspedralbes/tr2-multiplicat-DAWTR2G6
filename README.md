# Projectes finals curs 2023 2024

* Xifra Xalada
* Som una web que aporta exercicis dinàmics i divertits per a alumnes de PFI i el nostre joc és el següent:

Joc d'un sol jugador o d'entre 1 a 4 jugadors on, només començar la partida,
cadascú té 10 blocs d'estil tetris.
A partir d'una pregunta que sortirà per pantalla, amb una temàtica escogida clickant 
en categories, els jugadors tindran que respondre.
Si un jugador respon correctament i esta jugant sol, el seu nombre de blocks de tetris es veurà reduit per 1.
Si un jugador respon incorrectament i està jugant sol, el seu nombre de blocks augmentarà per 1.
Si un jugador està jugant amb altres i respon correctament, el seu nombre de blocks també es veurà reduit
però per la resta de jugadors, la seva pila de blocks augmentarà per 1. Mentre que si respon incorrectament,
el seu nombre de blocks augmentarà per 1.

## INTEGRANTS DEL EQUIP
* Josu Largo Fernandez, Pol Doña Pozuelo, Hugo Tripiana Gonzalez, Ruben de la Cerreza
* URL del prototip de penpod :
* URL del taiga.io: https://tree.taiga.io/project/poleet-xifraxalada/timeline
* URL de preproducció
* URL github : https://github.com/inspedralbes/tr2-multiplicat-DAWTR2G6
* URL de producció xifraxalada6.daw.inspedralbes.cat

## Instrucciones para Desarrolladores

    Clona el repositorio desde GitHub: git clone https://github.com/inspedralbes/tr2-multiplicat-DAWTR2G6.git
    Accede al directorio del proyecto: cd tr2-multiplicat-DAWTR2G6
    Instala las dependencias de Laravel: composer install
    Copia el archivo de configuración: cp .env.example .env
    Genera la clave de aplicación: php artisan key:generate
    Configura la base de datos en el archivo .env
    Ejecuta las migraciones: php artisan migrate
    Ejecuta el servidor de desarrollo: php artisan serve


## Tecnologías Utilizadas
### Laravel

Laravel fue elegido como el framework backend principal para el proyecto debido a su elegante sintaxis, facilidad de uso y potentes características. Algunas de las razones para elegir Laravel incluyen:

    Autorizaciones Simplificadas: Laravel proporciona un sistema de autorización robusto y fácil de implementar, lo que facilita la gestión de permisos y roles en la aplicación.

    ORM Eloquent: Utilizamos Eloquent, el ORM de Laravel, para interactuar con la base de datos. Esto simplifica la manipulación de datos y la relación entre los modelos en la aplicación.

## MariaDB (phpMyAdmin)

MariaDB se utiliza como sistema de gestión de bases de datos en conjunto con phpMyAdmin para administrar la base de datos de manera gráfica. Algunas consideraciones incluyen:

    Compatibilidad con Laravel: MariaDB es altamente compatible con Laravel, lo que facilita la integración y el rendimiento óptimo en la aplicación.

    Interfaz Gráfica con phpMyAdmin: La interfaz de usuario de phpMyAdmin proporciona una manera intuitiva de gestionar la base de datos, realizar consultas y realizar tareas de administración sin necesidad de comandos SQL directos.

## Vue.js

Vue.js se utiliza como el framework frontend para construir interfaces de usuario interactivas y reactivas. Algunas características destacadas son:

    Arquitectura de Componentes: Vue.js sigue una arquitectura de componentes, lo que facilita la construcción y el mantenimiento de la interfaz de usuario mediante la creación de componentes reutilizables.

    Enlace de Datos Reactivo: Vue.js facilita la manipulación del DOM de manera eficiente gracias a su sistema de enlace de datos reactivo.

## Otras Tecnologías

    MariaDB: Base de datos relacional utilizada para almacenar y gestionar los datos del proyecto.

    PHPMyAdmin: Herramienta de administración de bases de datos utilizada para gestionar la base de datos MariaDB de manera gráfica.

## Rutas de API en Laravel
### Autenticación de Usuario

    * Registro de Usuario:
        Método: POST
        Ruta: /register
        Controlador: UserController
        Método del Controlador: register

    * Inicio de Sesión:
        Método: POST
        Ruta: /login
        Controlador: UserController
        Método del Controlador: login

### Rutas Protegidas por Autenticación Sanctum

Se requiere autenticación mediante Sanctum para acceder a las siguientes rutas.

    * Perfil de Usuario:
        Método: GET
        Ruta: /user-profile
        Controlador: UserController
        Método del Controlador: userProfile

    * Cierre de Sesión:
        Método: GET
        Ruta: /logout
        Controlador: UserController
        Método del Controlador: logout

### Rutas Adicionales Protegidas por Sanctum

Además de las rutas de usuario, estas rutas también están protegidas por Sanctum.

    Obtener Usuario Autenticado:
        Método: GET
        Ruta: /user
        Controlador: Función anónima
        Middleware: auth:sanctum

    Obtener Todas las Preguntas:
        Método: GET
        Ruta: /recibir-preguntas-todas
        Controlador: preguntas
        Método del Controlador: recibir_preguntas_TODAS

    Obtener Preguntas por ID de Categoría:
        Método: GET
        Ruta: /recibir-preguntas-porCategoriaID/{id}
        Controlador: preguntas
        Método del Controlador: recibir_preguntas_porCategoriaID

    Obtener Preguntas por Nombre de Categoría:
        Método: GET
        Ruta: /recibir-preguntas-porCategoria/{id}
        Controlador: preguntas
        Método del Controlador: recibir_preguntas_porCategoria

Rutas en web.php
Gestión de Preguntas

    Listar Todas las Preguntas:
        Método: GET
        Ruta: /preguntas
        Controlador: preguntas
        Método del Controlador: index
        Nombre: preguntas.index

    Crear Nueva Pregunta (Formulario):
        Método: GET
        Ruta: /preguntas/create
        Controlador: preguntas
        Método del Controlador: create
        Nombre: preguntas.create

    Almacenar Nueva Pregunta:
        Método: POST
        Ruta: /preguntas
        Controlador: preguntas
        Método del Controlador: store
        Nombre: preguntas.store

    Mostrar Detalles de una Pregunta Específica:
        Método: GET
        Ruta: /preguntas/{pregunta}
        Controlador: preguntas
        Método del Controlador: show
        Nombre: preguntas.show

    Editar una Pregunta (Formulario):
        Método: GET
        Ruta: /preguntas/{pregunta}/edit
        Controlador: preguntas
        Método del Controlador: edit
        Nombre: preguntas.edit

    Actualizar una Pregunta Específica:
        Método: PUT
        Ruta: /preguntas/{pregunta}
        Controlador: preguntas
        Método del Controlador: update
        Nombre: preguntas.update

    Eliminar una Pregunta Específica:
        Método: DELETE
        Ruta: /preguntas/{pregunta}
        Controlador: preguntas
        Método del Controlador: destroy
        Nombre: preguntas.destroy


