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

<u>**Pedidos**</u>

```bash
//////////////////////// CREAR PEDIDO //////////////////////
//Creamos Un pedido nuevo
router.post('/', auth, PedidosController.nuevoPedido);
//http://localhost:3000/pedidos
//////////////////////// CREAR PEDIDO //////////////////////

////////////////////////ACTUALIZAR PEDIDO//////////////////////
//Actualizar pedido DB propia
router.put('/:id', auth,  PedidosController.actualizarPedido)
//http://localhost:3000/peliculas
////////////////////////ACTUALIZAR PEDIDO //////////////////////

//////////////////////// LEER PEDIDO //////////////////////
//Buscamos Pedidos Todos los pedidos en DB
router.get('/', auth, PedidosController.todosPedidos)
//http://localhost:3000/pedidos

//Busqueda Avanzada de pedido en DB
router.get('/avanzado', auth, PedidosController.infoPedidoAvanzado)
//http://localhost:3000/pedidos/avanzado

//Busqueda avanzada de Usuarios con alquiler
router.get('/avanzado/usuarios', auth, PedidosController.infoUsuarios)
//http://localhost:3000/pedidos/avanzado/usuarios

//Busqueda Avanzada de Usuarios por Nombre
router.get('/avanzado/usuarios/:nombre', auth, PedidosController.pedidoNombre)
//http://localhost:3000/pedidos/avanzado/usuarios/:nombre
//////////////////////// LEER PEDIDO //////////////////////

//////////////////////// BORRAR PEDIDO //////////////////////
//Borramos todos los pedidos en DB
router.delete('/', auth, PedidosController.borrarTodos)
//http://localhost:3000/pedidos

//Borrar pedidos de Ususarios por Nombre
router.delete('/avanzado/usuarios/:nombre', auth, PedidosController.borrarNombre)
//http://localhost:3000/pedidos/avanzado/usuarios/:nombre

//Borrar pedidos por ID en DB
router.delete('/id/:id', auth, PedidosController.borrarPorId)
//http://localhost:3000/pedidos/:id
//////////////////////// BORRAR PEDIDO //////////////////////
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

