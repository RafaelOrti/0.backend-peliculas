<<<<<<< HEAD
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
Clone el repositorio. *`git@github.com:RafaelOrti/backend-peliculas.git`*
```bash
git clone git@github.com:RafaelOrti/backend-peliculas.git
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

Campos de usuario:

`{`

   ` "name" : <insertar nombre aquí>`,

   ` "age": <inserte aquí la fecha de nacimiento con este formato: '1000-01-01 00:00:00'>`,

   ` "surname": <inserte apellido de usuario aquí>`,

   `"email": <insertar correo electrónico aquí>`

   `"password": <inserte la contraseña aquí>`,

   ` "nickname": <inserte nickname de usuario aquí>`,

   ` "rol": <inserte rol de usuario aquí>`,

   
   
`}`


#### - ***crear nuevos usuarios***
- ``
http://localhost:3000/usuarios/``

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


#### - ***eliminar datos de usuario***

##### **Se necesitan privilegios de administrador**
- ``
http://localhost:3000/usuarios/``

Método DELETE: eliminar todos los usuarios
- ``
http://localhost:3000/usuarios/:id``

Método DELETE: eliminar usuario por id

***

### ***Endpoints de películas***

Campos de películas:

`{`

   `"titulo": <insertar título aquí>`,

   ` "sinopsis": <inserte la sinopsis aquí`,

   ` "adulto" : <verdadero o falso>`,

   `"popularity": <insertar popularidad aquí>`,

   `"image": <insertar imagen aquí>`
   
   `"fecha" : <insertar fecha aquí>`
   
`}`


#### - ***añadir nuevas películas***

- ``
http://localhost:3000/películas/``

Método POST: agregar una nueva película

#### - ***busca una película***


- ``
http://localhost:3000/películas/``

Método GET: muestra una lista de todas las películas


- ``
http://localhost:3000/movies/novedades``

Método GET: muestra las películas más recientes


- ``
http://localhost:3000/películas/adultos``


Método GET: muestra una lista de películas para adultos


#### - ***actualizar datos de la película***

##### **JWT (privilegios de usuario) o privilegios de administrador necesarios**

#### - ***eliminar películas***

##### **Se necesitan privilegios de administrador**

***

### ***Puntos finales del pedido***

##### **JWT (privilegios de usuario) o privilegios de administrador necesarios**

Campos de pedido:

`{`
   `price: <insertar precio aquí>`
   
   ` peliculaId : <inserte movieId aquí>`

   ` usuarioId: <insertar ID de usuario aquí>`

   ` fecha: <inserte la fecha aquí con este formato '1000-01-01 00:00:00'>`

`}`


#### - ***crear pedidos***

- ``
http://localhost:3000/pedidos/``

Método GET: muestra una lista de todos los pedidos

- ``
http://localhost:3000/pedidos/nuevo``

Método POST: crear un nuevo pedido
***

#### ***Privilegios de nivel***

  

Los usuarios genéricos pueden explorar nuestra base de datos y crear solicitudes para un pedido.

Los usuarios de nivel Admin podrán crear un máximo de 5 pedidos cada mes cuando lo deseen.
=======
<a name="top"></a>

# backend-peliculas

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Mysql](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

![JsonWebToken](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-000f2f?style=for-the-badge&logo=letsencrypt&logoColor=white)






Esta es una API REST de una página web de compra de peliculas online, basada en node.js, con encriptación de contraseñas, con sistema de token y con sequelize como orm y mySQL como base de datos compuesta por las siguientes tablas `usuarios`, `peliculas`, `pedidos` y `pagos`.
</div>
<br/>


## Tabla de contenidos
* [Instalacion](#Instalación)<br>
* [Uso de la API](#Uso-de-la-API)<br>
* [Esquema de la base de datos](#Esquema-de-la-base-de-datos)<br>
* [Endpoints](#Endpoints)<br>

   
## Instalación
***

1. Abre la carpeta donde quieres copiar el repositorio con tu IDE.
2. Clona el repositorio:

    ```bash
    git clone git@github.com:RafaelOrti/backend-peliculas.git
    ```
3. Accede a la carpeta:
    ```bash
    cd backend-peliculas
    ```

4. Instala las dependencias:

    ```bash
    npm i
    ```

5. En `config/config.json` modifica:

    ```json
    "development": {
        ...,
        "password": "tu-contraseña",
        "database": "nombre-de-tu-base-de-datos",
        ...
    }
    ```

6. Creación de la base de datos:

    **Debes de descargar mySQL y tenerlo iniciado en tu PC**. 

* Crea la base de datos:
    ```bash
    npx sequelize db:create
    ```

* Ejecuta las migraciones:

    ```bash
    npx sequelize db:migrate
    ```
 
<<<<<<< HEAD
## Índice de contenidos
* [Contenido 1](#item1)
* [Contenido 2](#item2)
* [Contenido 3](#item3)
* [Contenido 4](#item4)
 
Lorem ipsum dolor
 
<a name="item1"></a>
### Contenido 1
 
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
 
[Subir](#top)
 
<a name="item2"></a>
### Contenido 2
 
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
 
[Subir](#top)
 
<a name="item3"></a>
### Contenido 3
 
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
 
[Subir](#top)
 
<a name="item4"></a>
### Contenido 4
 
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
 
[Subir](#top)
>>>>>>> dev
=======
6. Inicializa el servidor:

    ```bash
    npm run dev
    ```


## Uso de la API


### Esquema de la base de datos

![Software](/img/esquema.png)

### Peticiones REST

Podemos acceder a la API mediante los diferentes endpoints, a través de un frontend o plataformas API de testeo.

Recomendamos el uso de postman, para el cual se incluye una colección para testeo en la carpeta archivo-postman.

### Endpoints

<u>**Películas**</u>

```bash
////////////////////////CREAR PELICULA //////////////////////
//clonar peliculas
router.get('/clonar', PeliculasController.clonarPeliculas);
//http://localhost:3000/peliculas/clonar

//Registro de una peli nueva
router.post('/', PeliculasController.registraPelicula);
//http://localhost:3000/peliculas
////////////////////////CREAR PELICULA //////////////////////

////////////////////////ACTUALIZAR PELICULA //////////////////////
//Actualizar Pelicula DB propia
router.put('/:id', auth, isAdmin, PeliculasController.actualizarPelicula)
//http://localhost:3000/peliculas
////////////////////////ACTUALIZAR PELICULA //////////////////////

////////////////////////LEER PELICULA //////////////////////
//Leer todas las peliculas
router.get('/', auth, PeliculasController.traePeliculas);
//http://localhost:3000/peliculas

//Búsqueda peliculas por Genero En propia BD
router.get('/genero', auth, PeliculasController.peliculasGenero);
//http://localhost:3000/peliculas/genero

//Buscar Peliculas por Genero y Titulo en propia DB
router.get('/genero/titulo', auth, PeliculasController.peliculasGeneroTitulo);
//http://localhost:3000/peliculas/genero_titulo

//Búsqueda de película de mayor de 18 años
router.get('/adultos', auth, PeliculasController.peliculasAdultos);
//http://localhost:3000/peliculas/adultos

//Búsqueda de películas por título y adulto
router.get('/adultos/titulo', PeliculasController.peliculasAdultoTitulo);
//http://localhost:3000/peliculas/adultos/titulo

//Búsqueda de películas por popularidad
router.get('/favoritas', PeliculasController.peliculasFavoritas);
//http://localhost:3000/peliculas/favoritas
////////////////////////LEER PELICULA //////////////////////

////////////////////////BORRAR PELICULA //////////////////////
//Borrar Pelicula DB propia
router.delete('/', auth, isAdmin, PeliculasController.borrarPelicula)
//http://localhost:3000/peliculas

//Borrar todas Pelicula DB propia
router.delete('/todas', auth, isAdmin, PeliculasController.borrarPeliculas)
//http://localhost:3000/peliculas
////////////////////////BORRAR PELICULA //////////////////////
```
<u>**Usuarios**</u>

```bash
///////////////Registro y login////////////
//Registro
router.post('/registro', UsuariosController.registraUsuario);
//http://localhost:3000/Usuarios/registro

//Registro por email
router.post('/registro/email',UsuariosController.registraUsuarioEmail);
//http://localhost:3000/Usuarios/registro/email

//Confirmación registro por email
router.get('/confirmar/:emailToken',UsuariosController.confirmarEmail);
//http://localhost:3000/Usuarios/confirmar/:emailToken

//Login
router.post('/login', UsuariosController.loginUsuarios);
//http://localhost:3000/Usuarios/login
///////////////Registro y login////////////

///////////////Acciones usuario////////////
///////////////Actualizar////////////
//Actualizar contraseña de Usuario por id
router.put('/actualizar/newpassword', auth, UsuariosController.updatePasswordId);
//http://localhost:3000/Usuarios/actualizar/newpassword

//Subir de nivel a superusuario de Usuario por id
router.put('/actualizar/idAdmin', auth, UsuariosController.idAdmin);
//http://localhost:3000/Usuarios/actualizar/idAdmin

//Convertir en Auth de Usuario por id
router.put('/actualizar/idAuth', auth, UsuariosController.degradeProfileId);
//http://localhost:3000/Usuarios/actualizar/email/idAuth

//Actualizar datos de Usuario por id
router.put('/actualizar/perfilId/:id', auth, UsuariosController.updateProfileId);
//http://localhost:3000/Usuarios/actualizar/email/:id

//Actualizar contraseña de Usuario por email
router.put('/actualizar/newpassword', auth, UsuariosController.updatePasswordEmail);
//http://localhost:3000/Usuarios/actualizar/newpassword

//Subir de nivel a superusuario de Usuario por email
router.put('/actualizar/emailAdmin', auth, UsuariosController.emailAdmin);
//http://localhost:3000/Usuarios/actualizar/emailAdmin/:email

//Convertir en Auth de Usuario por email
router.put('/actualizar/emailAuth', auth, UsuariosController.degradeProfileEmail);
//http://localhost:3000/Usuarios/actualizar/email/emailAuth

//COnvertir en Admin de Usuario por email
router.put('/actualizar/perfilEmail/:email', auth, UsuariosController.updateProfileEmail);
//http://localhost:3000/Usuarios/actualizar/email/:email
///////////////Actualizar////////////

///////////////Acciones usuario////////////

///////////////Acciones superusuario////////////

///////////////Leer usuarios////////////
//Leer todos los Usuarios
router.get('/leer', auth, isAdmin, UsuariosController.traeUsuarios);
//http://localhost:3000/Usuarios/leer

//Lee Usuario por id
router.get('/leer/id/:id', auth, isAdmin, UsuariosController.traerUsuarioId);
//http://localhost:3000/Usuarios/leer/id/:id

//Lee Usuario por email 
router.get('/leer/email/:email', auth, isAdmin, UsuariosController.traerUsuariosEmail);
//http://localhost:3000/Usuarios/leer/email/:email

//Lee Usuario por nickname
router.get('/leer/nickname/:nickname', auth, isAdmin, UsuariosController.traerUsuariosNickname);
//http://localhost:3000/Usuarios/leer/nickname/:nickname
///////////////Leer usuarioa////////////

///////////////Borrar usuarios////////////
//Borramos a todos los Usuarios
router.delete('/borrar', auth, isAdmin, UsuariosController.deleteAll);
//http://localhost:3000/Usuarios/borrar

//Borramos a usuario por id
router.delete('/borrar/id/:id', auth, isAdmin, UsuariosController.deleteById);
//http://localhost:3000/Usuarios/borrar/id/:id

//Borramos a usuario por email
router.delete('/borrar/email/:email', auth, isAdmin, UsuariosController.deleteByEmail);
//http://localhost:3000/Usuarios/borrar/email/:email

//Borramos a usuario por nickname
router.delete('/borrar/nickname/:nickname', auth, isAdmin, UsuariosController.deleteByNickname);
//http://localhost:3000/Usuarios/borrar/nickname/:nickname
///////////////Borrar usuarios////////////

///////////////Acciones superusuario////////////
```


>>>>>>> dev
