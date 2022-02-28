
const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const UsuarioController = require('../controllers/UsuarioController');

//CRUD RESTful

//////////Lectura de usuarios//////////

//Leer todos los usuarios
router.get('/', auth,  UsuarioController.traeUsuarios);
//http://localhost:3000/usuarios/

//Lee usuarios por email
router.get('/email/:email', auth, UsuarioController.traerUsuarioEmail);
//http://localhost:3000/usuarios/email/:email

//Lee usuarios por id
router.get('/:id', auth, UsuarioController.traerUsuarioId);
//http://localhost:3000/usuarios/:id

//////////Lectura de usuarios//////////


//////////Registro y modificación de usuarios//////////

//Registro de usuarios
router.post('/registrar', UsuarioController.registraUsuario);
//http://localhost:3000/usuarios/registrar

//Modificar datos de un Usuario
router.put('/newpassword', auth, UsuarioController.updatePassword);
//http://localhost:3000/usuarios/newpassword

//Modificar datos de un perfil
router.put('/:id', auth, UsuarioController.updateProfile);
//http://localhost:3000/usuarios/:id

//////////Registro y modificación de usuarios//////////


//////////Eliminación de usuarios//////////

//Borramos a todos los usuarios
router.delete('/', auth, isAdmin, UsuarioController.deleteAll);
//http://localhost:3000/usuarios

//Borramos a los usuarios por id
router.delete('/:id', auth, UsuarioController.deleteById);
//http://localhost:3000/usuarios/:id

//////////Eliminación de usuarios//////////


//////////Login de usuarios//////////

//Login
router.post('/login', UsuarioController.logUsuario);
//https://localhost:3000/usuarios/login

//////////Login de usuarios//////////

module.exports = router;