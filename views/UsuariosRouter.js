
const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const UsuariosController = require('../controllers/UsuariosController');

//CRUD RESTful

//Leer todos los Usuarioss
router.get('/', auth,  UsuariosController.traeUsuarioss);
//http://localhost:3000/Usuarios


router.get('/email/:email', auth, UsuariosController.traerUsuariosEmail);

router.get('/:id', auth, UsuariosController.traerUsuariosId);

//Registro
router.post('/', UsuariosController.registraUsuarios);
//http://localhost:3000/Usuarios

//Modificar datos de un Usuarios
router.put('/newpassword', auth, UsuariosController.updatePassword);

router.put('/:id', auth, UsuariosController.updateProfile);


//Borramos a todos los Usuarios
router.delete('/', auth, isAdmin, UsuariosController.deleteAll);

//Borramos a todos los Usuarios
router.delete('/:id', auth, UsuariosController.deleteById);

//Login
router.post('/login', UsuariosController.logUsuarios);
//https://localhost:3000/Usuarios/login


module.exports = router;