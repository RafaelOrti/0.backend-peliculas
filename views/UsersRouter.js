const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/UsersController');

//CRUD RESTful
//Leer todos los usuarios
router.get('/', auth,  UsersController.traeUsuarios);
//http://localhost:3000/usuarios
router.get('/email/:email', auth, UsersController.traerUsuarioEmail);
router.get('/:id', auth, UsersController.traerUsuarioId);
//Registro
router.post('/', UsersController.registraUsuario);
//http://localhost:3000/usuarios
//Modificar datos de un Usuario
router.put('/:id', auth, UsersController.updateProfile);
//Borramos a todos los usuarios
router.delete('/', auth, UsersController.deleteAll);
//Borramos a todos los usuarios
router.delete('/:id', auth, UsersController.deleteById);
//Login
router.post('/login', UsersController.logUsuario);
//https://localhost:3000/usuarios/login

module.exports = router;