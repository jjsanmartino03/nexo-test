# Test Técnico Nexo Soluciones

Url para probar la API: https://nexotest.juli.ar/

Consigna: [Test Backend.pdf](./Test%20Backend.pdf)

## Descripción
El siguiente proyecto es un test técnico para la empresa Nexo Soluciones. Consiste
en una API REST que permite realizar operaciones CRUD sobre una base de datos
de personas.

A través de esta API se pueden crear, leer, actualizar y eliminar **personas**,
así como crear, modificar y obtener sus **direcciones**

## Tecnologías utilizadas
- **Node.js** como motor de ejecución, **TypeScript** como lenguaje de programación
- **NestJS** fue el framework utilizado para el desarrollo de la API
- **TypeORM** como ORM para la conexión con la base de datos
- **Jest** como framework de testing
- **PostgreSQL** como motor de base de datos, lo elegí por mi experiencia con el, y 
porque [Render](render.com) ofrece una base online gratuita en Postgres
- **Google Cloud Run** como plataforma de despliegue
- **Vercel** como proveedor de dominio (nexotest.juli.ar)
- **Cloudinary** como proveedor de almacenamiento de imágenes, para las fotos de cada
persona
- **Swagger** para la documentación de la API, y para poder realizar pruebas interactivas en el navegador

Aclaración: ¿Por qué elegí Node.js? La consigna no especificaba un lenguaje en particular, así que opté por el stack tecnológico que más
conozco y con el cuál podía hacer una API en el menor tiempo posible. NestJS permite desarrollar APIs en Node.js de una 
manera rápida, completa y de forma modular. De ser necesario, podría utilizar Laravel o Django Rest Framework para desarrollar
esta API, ya que también tengo experiencia con estos frameworks, pero elegí NestJS por preferencia.

## Instalación
1. Clonar el repositorio
2. Instalar las dependencias con `npm install`
3. Crear un archivo `.env` en la raíz del proyecto, con las siguientes variables de entorno:
    - `PORT`: Puerto en el que se ejecutará la API
    - `DATABASE_URL`: URL de la base de datos, en formato `postgres://user:password@host:port/database`
    - `CLOUDINARY_CLOUD_NAME`: Nombre del cloud de Cloudinary
    - `CLOUDINARY_API_KEY`: API Key de Cloudinary
    - `CLOUDINARY_API_SECRET`: API Secret de Cloudinary
4. Ejecutar el comando `npm run start:dev` para iniciar el servidor en modo desarrollo

En caso de no tener node instalado, se puede ejecutar la aplicación en modo producción con Docker, a partir del Dockerfile
en la carpeta raíz.

## Testing
Para ejecutar los tests, se debe ejecutar el comando `npm run test`

Cada caso de uso se encuentra testeado. Hay dos tests suites, una para el AddressService y otra para 
el PeopleService. Cada test suite tiene tests para cada caso de uso, y para cada uno de los errores que pueden ocurrir. Los tests que 
realicé son de caja blanca.

## Estructura del proyecto
El proyecto está dividido en 3 módulos:
- **PersonModule**: Contiene los controladores, servicios, entidades y DTOs relacionados con las personas
- **AddressModule**: Contiene los controladores, servicios, entidades y DTOs relacionados con las direcciones
- **PhotosModule**: Contiene el servicio que se encarga de subir las fotos de las personas a Cloudinary

La estructura de cada módulo es la siguiente:
- **Controller**: Contiene los controladores de cada módulo, que se encargan de recibir las peticiones HTTP y llamar a los servicios correspondientes
- **Service**: Contiene los servicios de cada módulo, que se encargan de realizar las operaciones de negocio
- **Entity**: Contiene las entidades de cada módulo, que representan las tablas de la base de datos
- **DTO**: Contiene los DTOs de cada módulo, que representan los objetos que se reciben y se devuelven en las peticiones HTTP
- **Test**: Contiene los tests de cada módulo, que se encargan de probar los controladores y servicios

## Documentación
La documentación de la API se encuentra en la ruta `/swagger`. Allí se puede ver la documentación de cada endpoint, y realizar pruebas interactivas. Para obtener el archivo
`swagger.json` se debe acceder a la ruta `/swagger-json`, o en su defecto utilizar el archivo `swagger.json` que se encuentra en la carpeta raíz.

## Esquema de la base de datos
![img.png](db.png)

----------------------

¿Qué haría diferente si tuviera más tiempo?
- Mejoraría los tests. Hice tests unitarios para caso de uso, pero estos se podrían mejorar utilizando Tests Doubles más
sofisticados. En mi caso utilicé solo mocks y spies, pero se podrían agregar Fakes, Factories, Stubs, etc. Además, agregaría tests de Integración
- Agregaría un sistema de autenticación y autorización, para que solo los usuarios autenticados puedan acceder a la API
- Añadiría logs, para poder registrar lo que sucede en la API
- Integraría Github Actions para que se ejecuten los tests automáticamente al pushear código, y para deployar automáticamente la aplicación