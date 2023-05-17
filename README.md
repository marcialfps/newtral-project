# Proyecto Newtral
Este proyecto es una prueba técnica realizada para Newtral.

## Documentación
- [Requisitos](/docs/requirements.md)
- [Stack tecnológico](/docs/technologies.md)
- [API](/docs/api.md)
- [UI](/docs/ui.md)

## Lanzar en local
1. Descargar y lanzar ElasticSearch de acuerdo a como se explica en la [documentación](https://www.elastic.co/guide/en/elasticsearch/reference/current/zip-windows.html).
2. En una nueva terminal lanzar la api:
```
$ cd ./api
$ npm i
$ node server.js
```
4. Finalmente, en otra terminal lanzar el ui:
```
$ cd ./ui
$ npm i
$ npm run dev
```

Tras realizar estos pasos la aplicación estará disponible en `localhost:3001`.
