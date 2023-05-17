# Documentación de la API
La API se encuentra dividida por responsabilidades de cada elemento. La estructura del proyecto y las conexiones entre los diferentes elementos es la siguiente:

![api-uml drawio](https://github.com/marcialfps/newtral-project/assets/35959222/986e3e82-2a01-48ca-82f0-5356b896fb54)

## Routes
Define las rutas que contiene la API y el método REST asociado. A continuación, añade un middleware, si es necesario, para transformar el `body` que se recibe en la petición. Finalmente se indica el controlador encargado de procesar y responder.

## Controllers
Recibe la petición HTTP, formatea los datos para que los reciba el servicio asociado, se llama al servicio y finalmente se encarga de enviar la respuesta correspondiente.

## Services
El servicio se encarga de realizar la lógica de negocio. Se realizan transformaciones de datos, si es necesario, utilizando los modelos, para que puedan ser procesados por la base de datos. Se conecta con la base de datos para realizar las operaciones correspondientes.

## Models
Recibe datos y los transforma al modelo definido.

## DB
A partir de la configuración se obtiene cuál será la base de datos que utilizará. Esto nos permite cambiar de base de datos sin realizar cambios en el resto del código.

## Providers
Define un prototipo que deben utilizar los providers. De esta manera desconectamos el resto del código de los detalles de implementación de cada tipo de base de datos.
