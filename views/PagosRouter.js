
const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const PagosController = require('../controllers/PagosController');

//CRUD RESTful

///////////////Registro PAGO////////////
//Registro
router.post('/nuevo',auth, PagosController.registraPago);
//http://localhost:3000/Usuarios/registro

///////////////Registro PAGO ////////////

////////////////////////ACTUALIZAR PAGO //////////////////////

//Actualizar pago DB propia
router.put('/actualizar/:id', auth, PagosController.actualizarPago)
//http://localhost:3000/pagos

////////////////////////ACTUALIZAR PAGOS //////////////////////


////////////////////////LEER PAGOS //////////////////////
//Leer todas las pagos
router.get('/leer/:id', auth, PagosController.leerPago);
//http://localhost:3000/pagos


////////////////////////LEER pago //////////////////////


////////////////////////BORRAR pago //////////////////////

//Borrar pago DB propia
router.delete('/borrar/:id', auth,  PagosController.borrarPago)
//http://localhost:3000/pagos


////////////////////////BORRAR pago //////////////////////


module.exports = router;