# CARLOS MARADIAGA PRUEBA
Prueba realizada con NodeJS, MySQL, TypeScript y Repository Pattern. 

## Dependencias

- [NodeJS](https://nodejs.org/en)
- [NPM](https://www.npmjs.com/)
- [Docker Compose](https://docs.docker.com/get-started/08_using_compose/)


### Pasos

- Ejecutar archivo "docker-compose.yml" con Docker Compose ([Adminer](https://hub.docker.com/_/adminer/) se ejecuta en localhost:8080):
```sh
$ docker-compose.yml up -d
```
- Importar el backup de la base de datos en MySQL que se encuentra dentro de la capeta "db".
- Instalar dependencias:
```sh
$ npm install
```
- Correr el proyecto:
```sh
$ npm run start:dev
```

