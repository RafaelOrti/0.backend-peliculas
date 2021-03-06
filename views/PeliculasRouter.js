const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin")


const PeliculasController = require('../controllers/PeliculasController');

//CRUD RESTful


//////////////////////// ENDPOINTS A DB //////////////////////

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






//////////////////////// ENDPOINTS A MOVIE DB //////////////////////


//Búsqueda de películas por título
router.get('/titulo', PeliculasController.peliculasTitulo);
//http://localhost:3000/peliculas/titulo

//Búsqueda de novedades
router.get('/novedades', PeliculasController.traeNovedades);
//http://localhost:3000/peliculas/novedades


// Traemos las peliculas con mejor nota -- /mejor_valoradas
router.get('/top', auth, PeliculasController.peliculasValoradas)
//http://localhost:3000/peliculas/top

//Ultima pelicula subida a la base de datos MOVIE DATABASE -- /latest
router.get('/ultimas', auth, PeliculasController.peliculasUltimas)
//http://localhost:3000/peliculas/ultimas



//Traemos las peliculas relacionadas con la pelicula ID
router.get('/:id/relacionadas', auth, PeliculasController.peliculasRelacionadas)
//http://localhost:3000/peliculas/:id/relacionadas


//Busqueda de Reviews de peliculas por id
router.get('/:id/reviews', auth, PeliculasController.peliculasIdReviews)
//http://localhost:3000/peliculas/:id/reviews

//Busqueda por ID
router.get('/:id', auth, PeliculasController.peliculasPorId)
//http://localhost:3000/peliculas/:id



module.exports = router;