
const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const UsuariosController = require('../controllers/UsuariosController');

//CRUD RESTful

///////////////Registro y login////////////
//Registro
router.post('/registro', UsuariosController.registraUsuario);
//http://localhost:3000/Usuarios/registro

//Login
router.post('/login', UsuariosController.loginUsuarios);
//http://localhost:3000/Usuarios/login

///////////////Registro y login////////////

///////////////Acciones usuario////////////
///////////////Actualizar////////////

////////////////id//////////////
//Actualizar datos de Usuario por id
router.put('/actualizar/:id', auth, UsuariosController.updateProfileId);
//http://localhost:3000/Usuarios/actualizar/:id

//Actualizar contraseña de Usuario por id
router.put('/actualizar/newpassword', auth, UsuariosController.updatePasswordId);
//http://localhost:3000/Usuarios/actualizar/newpassword

//Subir de nivel a superusuario de Usuario por id
router.put('/actualizar/idAdmin', auth, UsuariosController.adminId);
//http://localhost:3000/Usuarios/actualizar/idAdmin

////////////////id//////////////
////////////////email//////////////

//Actualizar datos de Usuario por email
router.put('/actualizar/:email', auth, UsuariosController.updateProfileEmail);
//http://localhost:3000/Usuarios/actualizar/:email

//Actualizar contraseña de Usuario por email
router.put('/actualizar/newpassword', auth, UsuariosController.updatePasswordEmail);
//http://localhost:3000/Usuarios/actualizar/newpassword

//Subir de nivel a superusuario de Usuario por email
router.put('/actualizar/emailAdmin', auth, UsuariosController.adminEmail);
//http://localhost:3000/Usuarios/actualizar/emailAdmin/:email

////////////////email//////////////
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



module.exports = router;