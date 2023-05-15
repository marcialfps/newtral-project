# Requisitos

Consideraciones generales:
- Se dispone de 1 semana de plazo para la entrega de dicha prueba
- Desarrollar una Api Rest en Python, Nodejs o cualquier otro lenguaje
- Usar Elasticsearch como Base de datos
- Se adjunta un csv para realizar la importación de los datos
- La Api se mostrará mediante Swagger, OpenApi o similar

Requisitos:
Crear API REST que tenga los siguientes métodos:
- POST - /bulk  para la importación del csv
- GET - /politicians mostrar un listado paginado
   - QUE INCLUYA la opción de poder hacer búsqueda fuzzy por nombre
   - QUE INCLUYA filtro por partido
   - QUE INCLUYA filtro por género
- GET - /politicians/id obtener un político por el id
- PATCH - /politicians/id que se pueda modificar un político
- DELETE - /politicians/id que se pueda eliminar un político.
- GET - /statistics que devuelva la media, la mediana del salario base de todos los políticos y el top 10 de los salarios políticos con salarios más altos.
- Añadir vistas correspondientes en front mediante React, Angular o cualquier otro framework. 
- El diseño debe ser responsive, se permite usar Material, Bootstrap o cualquiera, como el candidato prefiera.

Bonus points, se valorará:
- Uso y despliegue con docker
- Buenas prácticas y guías de estilo
- Añadir tests
- Documentación en código
