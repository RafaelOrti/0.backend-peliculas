
const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const UsuariosController = require('../controllers/UsuariosController');

//CRUD RESTful

///////////////Registro y login////////////
//Registro
router.post('/registro', UsuariosController.registraUsuario);
//http://localhost:3000/Usuarios

//Login
router.post('/login', UsuariosController.loginUsuarios);
//https://localhost:3000/Usuarios/login

///////////////Registro y login////////////

///////////////Acciones usuario////////////
///////////////Actualizar////////////

////////////////id//////////////
//Actualizar datos de Usuario por id
router.put('/actualizar/:id', auth, UsuariosController.updateProfileId);

//Actualizar contraseña de Usuario por id
router.put('/actualizar/newpassword', auth, UsuariosController.updatePasswordId);

//Subir de nivel a superusuario de Usuario por id
router.put('/actualizar/idAdmin/:id', auth, UsuariosController.adminId);
////////////////id//////////////
////////////////email//////////////
//Actualizar datos de Usuario por email
router.put('/actualizar/:email', auth, UsuariosController.updateProfileEmail);

//Actualizar contraseña de Usuario por email
router.put('/actualizar/newpassword', auth, UsuariosController.updatePasswordEmail);

//Subir de nivel a superusuario de Usuario por email
router.put('/actualizar/emailAdmin/:email', auth, UsuariosController.adminEmail);
////////////////email//////////////
///////////////Actualizar////////////


///////////////Acciones usuario////////////


///////////////Acciones superusuario////////////

///////////////Leer usuarios////////////
//Leer todos los Usuarios
router.get('/leer', auth, isAdmin, UsuariosController.traeUsuarios);
//http://localhost:3000/Usuarios

//Lee Usuario por id
router.get('/leer/:id', auth, isAdmin, UsuariosController.traerUsuarioId);

//Lee Usuario por email 
router.get('/leer/email/:email', auth, isAdmin, UsuariosController.traerUsuariosEmail);

//Lee Usuario por nickname
router.get('/leer/nickname/:nickname', auth, isAdmin, UsuariosController.traerUsuariosNickname);
///////////////Leer usuarioa////////////

///////////////Borrar usuarios////////////
//Borramos a todos los Usuarios
router.delete('/borrar', auth, isAdmin, UsuariosController.deleteAll);

//Borramos a usuario por id
router.delete('/borrar/:id', auth, isAdmin, UsuariosController.deleteById);

//Borramos a usuario por email
router.delete('/borrar/:email', auth, isAdmin, UsuariosController.deleteByEmail);

//Borramos a usuario por nickname
router.delete('/borrar/:nickname', auth, isAdmin, UsuariosController.deleteByNickname);
///////////////Borrar usuarios////////////

///////////////Acciones superusuario////////////



module.exports = router;