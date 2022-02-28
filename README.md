# Simulación del backend de un videoclub online
***

### **Descripción del proyecto**

En este proyecto crearemos un backend 
con las siguientes funcionalidades:

- Comunicación mediante apiRest a API externa TheMovieDatabase.
- Sistema de usuarios con usuario genérico y superusuario.
- Base de datos mediante sequelize y mysql.
- Sistema de token temporal para acceso a los endpoints.
- Encriptación de contraseñas mediante bcrypt.
- Testing de la base de datos con seeders.


***


### **Instalación**

#### ***Dependencias y software***


![Software](/img/dependencias.png)

Cree una carpeta y ábrala en *Visual Studio Code* u otro editor de código.
Clone el repositorio. *`https://github.com/suku60/BackendFilmDatabase02-22`*
```bash
clon de git https://github.com/suku60/BackendFilmDatabase02-22
```

En primer lugar, debemos instalar una serie de dependencias necesarias para nuestro proyecto utilizando el administrador de paquetes npm.

Abra una nueva terminal y escriba:
```bash
npm i
```

Instalará automáticamente todas las dependencias necesarias.

Abra *MySQL Workbench* y cree un nuevo esquema con el mismo nombre que en config.json en *"development".*

Ahora debe migrar la base de datos a *MySQL Workench*.

Abra una nueva terminal en *VSC*.

Instale Sequelize .

```bash
npm i sequelize
```

Ahora cree y migre su base de datos.

```bash
sequelize db:create
sequelize db:migrate
```

Ejecute el servidor con node.js:
```bash
npm run dev
```

Ahora podrá leer y modificar datos de *Postman*.



<!-- Sequelieze no es necesario para el usuario -->


***

### ***Endpoints & Postman testing***


### ***endpoints de usuario***

Requisitos de datos de usuario:

`{`

   ` "nombre" : <insertar nombre aquí>`,

   ` "fecha de nacimiento": <inserte aquí la fecha de nacimiento con este formato: '1000-01-01 00:00:00'>`,

   ` "nickname": <inserte nombre de usuario aquí>`,

   `"password": <inserte la contraseña aquí>`,

   `"correo electrónico": <insertar correo electrónico aquí>`
   
`}`


#### - ***crear nuevos usuarios***
- ``
http://localhost:3000/usuarios/nuevo``

Método POST: crear un nuevo usuario

#### - ***mostrar usuarios***

- ``
http://localhost:3000/usuarios/``

Método GET: muestra una lista de todos los usuarios


#### - ***modificar datos de usuario***

##### **JWT o privilegios de administrador necesarios**

- ``
http://localhost:3000/usuarios/:id``

Método PUT: modificar datos de usuario


- ``
http://localhost:3000/usuarios/:id/levelup``

Método PUT: subir de nivel los datos del usuario


#### - ***eliminar datos de usuario***

##### **Se necesitan privilegios de administrador**
- ``
http://localhost:3000/usuarios/``

Método DELETE: eliminar todos los usuarios
- ``
http://localhost:3000/usuarios/:id``

Método DELETE: eliminar usuario por id

***

### ***Puntos finales de películas***

Requisitos de la película:

`{`

   `"título": <insertar título aquí>`,

   ` "año": <inserte el año aquí con este formato '1000-01-01 00:00:00'>`,

   ` "adulto" : <verdadero o falso>`,

   `"popularidad": <insertar popularidad aquí>`,

   `"imagen": <insertar imagen aquí>`
   
   ` descripción : <insertar descripción aquí>`
   
`}`


#### - ***añadir nuevas películas***

- ``
http://localhost:3000/películas/nuevo``

Método POST: agregar una nueva película

#### - ***busca una película***


- ``
http://localhost:3000/películas/``

Método GET: muestra una lista de todas las películas


- ``
http://localhost:3000/movies/newest``

Método GET: muestra las películas más recientes


- ``
http://localhost:3000/películas/adulto``


Método GET: muestra una lista de películas para adultos


#### - ***actualizar datos de la película***

##### **JWT (privilegios de usuario) o privilegios de administrador necesarios**

- ``
http://localhost:3000/movies/update/:id``

Método PUT: actualizar/modificar datos de películas por id.


#### - ***eliminar películas***

##### **Se necesitan privilegios de administrador**

- ``
http://localhost:3000/movies/delete/all``

Método DELETE: elimina todas las películas

- ``
http://localhost:3000/movies/delete/:id``

Método DELETE: eliminar una película por id

***

### ***Puntos finales del pedido***

##### **JWT (privilegios de usuario) o privilegios de administrador necesarios**

Requisitos de pedido:

`{`

   ` ID de usuario: <insertar ID de usuario aquí>`

   ` movieId : <inserte movieId aquí>`

   ` fecha: <inserte la fecha aquí con este formato '1000-01-01 00:00:00'>`

   `precio: <insertar precio aquí>`

   ` activo : <verdadero o falso>`
   
`}`


#### - ***crear pedidos***

- ``
http://localhost:3000/pedidos/``

Método GET: muestra una lista de todos los pedidos

- ``
http://localhost:3000/pedidos/nuevo``

Método POST: crear un nuevo pedido


#### - ***mostrar pedidos por estado o id***

- ``
http://localhost:3000/orders/active ``

Método GET: muestra una lista de todas las órdenes activas

- ``
http://localhost:3000/pedidos/:id``

Método PUT: actualizar los datos del pedido


#### - ***eliminar pedidos***

- ``
http://localhost:3000/orders/delete/all``

Método DELETE: eliminar todos los pedidos

- ``
http://localhost:3000/orders/delete/:id/``

Método DELETE: eliminar un pedido por id

***
#### ***Privilegios de nivel explicados***

  

Los usuarios genéricos pueden explorar nuestra base de datos y crear solicitudes para un pedido.

Los usuarios de nivel Admin podrán crear un máximo de 5 pedidos cada mes cuando lo deseen.

Actualiza a nivel pagando la suscripción mensual