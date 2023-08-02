# CARLOS MARADIAGA | PRUEBA
Prueba realizada con NodeJS, MySQL, TypeScript, Mocha y Repository Pattern. 

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
- Configurar las variables de entorno (si es necesario) usando de ejemplo el archivo: "dev.env" que se encuentra dentro de la carpeta "config", por casos de la prueba lo dejaré con mis variables definidas y no como dev.example.env.
- Instalar dependencias:
```sh
$ npm install
```
- Correr el proyecto:
```sh
$ npm run start:dev
```
- Por cuestiones de tiempo no pude terminar la documentación con [Swagger](https://swagger.io/), sin embargo la colección de consultas para [Postman](https://www.postman.com/) se encuentran en la carpeta "postman".
- Impotar la configuración del punto anterior en [Postman](https://www.postman.com/).
- He definido la ruta: http://localhost:3000/check para verificar si el proyecto está corriendo.

## Pruebas

Por cuestiones de tiempo solo hice pruebas al guardar un tipo y si se pretende guardar otro con el mismo nombre, para esto hice un mock para no afectar los datos reales, las pruebas se pueden ejecutar con el comando:

 ```sh
$ npm run test
```

## Observaciones

A continuación detallo algunas observaciones que considero importante aclarar y otras cosas que por tiempo no lo hice así:

- Algunas cosas las definí en español por cosas de entendimiento, sé que lo ideal hubiera sido que todo estuviera en inglés.
- Hubiera estado genial hacer la configuración de Docker para también tener NodeJS dentro.
- Usé MySQL ya que lo tenía a mano, sin embarho usar MongoDB daría la ventaja de usar el MEAN STACK, pensando en la escabilidad de usar Angular como frontend.
- Las tablas "pokemonMovimiento" y "pokemonTipo" las hice de tipo detalle para que un pokémon pueda tener muchos movimientos(Dependiendo de su tipo) y ser a la vez de muchos tipos.
- Los endpoints los hice de una manera pensando que un frontend hará la petición, de esta manera se deben considerar que en el mismo pueden haber combobox e información filtrada para evitar errores. Por ejemplo: Un pokémon no puede usar movimientos que no sean de su tipo, la salud actual no puede ser mayor que la total, etc. 
- Consideré que un pokemon base es el que aún no tiene tipo y movimientos, por cuestiones de tiempo no hice endpoints para asignarlos y de esta manera pasen a ser fase final (Ready to fight), hay dos de este tipo pero los ingresé directo en la base de datos.
- Ingresé los datos que consideré necesarios para la prueba.
- No encontré ejemplo de nivel en la documentación del PDF, así que lo agregué en un rango de 1 a 10.

## Parte 3

No me dió tiempo de hacer esta parte, sin embargo, pienso que se podría resolver de la siguiente manera:

- Definir una tabla "batalla" donde se almacene nombre, oponentes, ganador, descripcion...
- Se podría agregar un campo al pokémon para mostar su experiencia, esto basado en las batallas que ha participado.
- Definir una tabla "historialBatalla" de tipo detalle, su función será almacenar los movimientos de la batalla, por ejemplo: El pokémon x ha atacado a y, provocando un daño de z; considerando que es una tabla almacenaría el id de la batalla, id del pokémon atacante, id del pokémon atacado, puntos que se han restado por el daño sufrido...
- Los métodos del API serían guardar el la información de la batalla y por cada movimiento guardar el detalle y a la vez modificar los puntos del pokémon afectado, de este modo se podría detener la batalla una vez un pokémon llegue a 0 puntos de vida y guardar como ganador al contrario.
- Teniendo el detalle y la batalla actualizada, se podría dar un resumen de la misma con todos los datos almacenados al final de la batalla.

