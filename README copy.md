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
* [Contenido 3](#item3)<br>
* [Contenido 4](#item4)<br>

 [3. Como Usar:](#3-descripción-del-proyecto)<br>
   
### Instalación
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

* Haz las migraciones:

    ```bash
    npx sequelize db:migrate
    ```
 
6. Inicializa el servidor:

    ```bash
    npm run dev
    ```


## Uso de la API
![Image text](assets/img/readme.png)



### Detalles de diseño

Se resaltan los diferentes aspectos del diseño:
* Animaciones de ataque
* Menú de selección
* Repetibilidad del juego
* Pantallas de carga





### Mejoras a futuro

Se tiene prevista incluir la funcionalidad de los siguientes elementos:
* Proporcionalidad de tipo de ataque
* Mejora de diseño
* Modo captura pokemon

## Tecnologias
***

## 2. Descripción del proyecto.

## Instalacion
***
 
```
$ git clone git@github.com:oriolCode/web-restaurante.git
$ cd ../path/to/the/index.html
$ npm start index.html
```
Esta pagina web esta especialmente diseñado para ```Google chrome``` donde su rendimiento será mejor.

## FAQs
***

1. __Es compatible con otros navegadores:__ 
Si, lo es.



## Installing


# Using the API

## Data Base draw

```mermaid
%%{init: {
    'theme': 'base', 
    'themeVariables': { 
        'primaryColor': '#282a36',
        'primaryTextColor': '#282a36',
        'mainBkg': '#bd93f9',
        'lineColor': '#6272a4'
    }
}}%%
erDiagram
    USER ||--o{ ORDER : ""
    USER {
        integer id
        string name
        integer age
        string surname
        string email
        string nickname
        string password
        boolean isAdmin
        date createdAt
        date updatedAt
    }
    ORDER {
        integer id
        integer price
        integer movieId
        integer userId
        date createdAt
        date updatedAt
    }
    MOVIE ||--o{ ORDER : ""
    MOVIE {
        integer id
        string title
        string description
        boolean adult
        float popularity
        string image
        string date
        date createdAt
        date updatedAt
    }
```
### Expected Behaviour

`createdAt`, `updatedAt`, `id`, are obligatory and auto-generated.

the `id` is the **Primary Key** of the tables.

USER `name`, `email`, are obligatory.

USER `email`, `nickname`, are unique.

MOVIE `title`, `description`, `adult`, are obligatory.

ORDER `movieId`, `userId`, `date`, are obligatory.

`movieId` and `userId` are the MOVIE and the USER **Foreign Key** respectively.

You may see references for the **Primary Key** as `pk` and for the **foreign key** as `fk`.

## Endpoints

To see the endpoints and how they works, check our [documentation](https://github.com/luigiMinardi/movieClubBackend/wiki).

<div align="center">

[![Documentation](https://img.shields.io/badge/go%20to-documentation-informational?style=for-the-badge)](https://github.com/luigiMinardi/movieClubBackend/wiki)
</div>

# WIP

[] - Improve admin rights

[] - Creation of payment

[] - Refactor of view-controllers to be more restfull

[] - turn some endpoints in more generic versions of them to be more scalable

[] - Automated tests

[] - Adding error responses to the documentation