const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin")


const PeliculasController = require('../controllers/PeliculasController');

//CRUD RESTful


//////////////////////// ENDPOINTS A DB //////////////////////

//Leer todas las peliculas
router.get('/', PeliculasController.traePeliculas);
//http://localhost:3000/peliculas

//Registro de una peli nueva
router.post('/', PeliculasController.registraPelicula);
//http://localhost:3000/peliculas

//Borrar Pelicula DB propia
router.delete('/', auth, isAdmin, PeliculasController.borrarPelicula)
//http://localhost:3000/peliculas

//Busca peliculas por Genero En propia BD
router.get('/genero', auth, PeliculasController.buscaGenero);
//http://localhost:3000/peliculas/genero

//Búsqueda de película de mayor de 18 años
router.get('/adultos', PeliculasController.peliculasAdultos);
//http://localhost:3000/peliculas/adultos

//Búsqueda de películas por título y adulto
router.get('/favoritas', PeliculasController.peliculasFavoritas);
//http://localhost:3000/peliculas/favoritas

//Buscar Peliculas por Genero y Titulo en propia DB
router.get('/genero_titulo', auth, PeliculasController.buscaGenTit);
//http://localhost:3000/peliculas/genero_titulo


//////////////////////// ENDPOINTS A MOVIE DB //////////////////////


//Búsqueda de películas por título
router.get('/titulo', PeliculasController.peliculasTitulo);
//http://localhost:3000/peliculas/titulo

//Búsqueda de novedades
router.get('/novedades', PeliculasController.traeNovedades);
//http://localhost:3000/peliculas/novedades

//Ultima pelicula subida a la base de datos -- /latest
router.get('/ultimas', auth, PeliculasController.peliculasUltimas)
//http://localhost:3000/peliculas/ultimas


// Traemos las peliculas con mejor nota -- /mejor_valoradas
router.get('/top', auth, PeliculasController.peliculasValoradas)
//http://localhost:3000/peliculas/top


//Traemos las peliculas relacionadas con la pelicula ID
router.get('/:id/relacionadas', auth, PeliculasController.peliculasRelacionadas)
//http://localhost:3000/peliculas/:id/relacionadas


//Busqueda por ID
router.get('/:id', auth, PeliculasController.peliculasPorId)
//http://localhost:3000/peliculas/:id


//Busqueda de Reviews de peliculas por id
router.get('/:id/reviews', auth, PeliculasController.peliculasIdReviews)
//http://localhost:3000/peliculas/:id/reviews


module.exports = router;