# Amadeus-books

En este proyecto se puede encontrar un servicio realizado con SpringBoot y un Front realizado en Angular JS.

## Spring Service
### Base de datos
    Para levantar la base de datos es importante ejecutar el docker-compose que se encuentra en el proyecto, este se encarga de levantar el contenedor de la base de datos exponiendo el puerto 5433 y adicional ejecuta un script sobre la base de datos para crear el usuario, base de datos, dar permisos sobre la base de datos al usuario y dar permisos sobre el esquema al usuario que va a utilizar el servicio para su correcto funcionamiento,, tras levantar el contenedor de la base de datos se puede ejecutar el servicio para que automaticamente genere el esquema que necesita para la gestion de los datos
 este servicio cuenta con dos controladores:
 ### UserController
    En este controlador se lleva a cabo la adminisitraciónde los usuarios (autenticación y creación), al momento de autenticarse el usuario genera un JWT con la SECRET_KEY definida en las propiedades del proyecto. Así mismo cuenta con un metodo de validación de token para hacer su respectivo refresh, tanto la generación del token como el refresh tienen un tiempo establecido de vigencia, el tiempo de cada uno de estos al igual que el SECRET_KEY se encuentran definidos en las propiedades para una mejor administración
### BookController
    En este controlador se lleva a cabo la administración de los libros que se quieran registrar, consultar, actualizar o eliminar en el sistema
### Config
    Dentro de las configuraciones del proyecto se encuentra la configuración correspondiente a la libreria de OpenApi para prepararla y poder agregar el token en la documentación del swagger, adicionalmente se encuentran las configuraciones para valdiar cada una de las peticiones que entran al servicio para permitir el acceso o validar si tienen un token válido, en este caso dentro de las valdiaciones estámos permitiendo cualquier petición hacía los endpoints de registro de usuario y autenticación, para el resto de peticiones es necesario el token, adicionalmente se realiza la configuración para que el proyecto reciba peticiones desde cualquier origen
## Front Angular
    En el proyecto de Angular se encuentran los componentes para autenticación y registro, una vez se ejecuta la applicación por defecto dirigirá al registro del usuario para posteriormente poder iniciar en el sistema, una vez se registre podra iniciar sesión para poder consultar los libros registrados en el sistema. Cuenta con un interceptor para agregar la cabecera de las peticiones salientes el tyoken generado al momento de iniciar sesión el cual se encuentra guardado en el localStorage, se filtran las peticiones para no agregar el cabecero en las peticiones de registro y login por parte del usuario
