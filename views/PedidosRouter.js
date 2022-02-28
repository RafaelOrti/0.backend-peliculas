const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')

const OrdersController = require('../controllers/PedidosController');


//Creamos Un pedido nuevo
router.post('/', auth, PedidosController.nuevoPedido);
//http://localhost:3000/pedidos

//Buscamos Pedidos Todos los pedidos en DB
router.get('/', auth, PedidosController.todosPedidos)
//http://localhost:3000/pedidos

//Borramos todos los pedidos en DB
router.delete('/', auth, PedidosController.borrarTodos)
//http://localhost:3000/pedidos

//Busqueda Avanzada de pedido en DB
router.get('/avanzado', auth, PedidosController.infoPedidoAvanzado)
//http://localhost:3000/pedidos/avanzado

//Busqueda de Usuarios Menores con peliculas para adultos Alquiladas
router.get('/paterntalAlert', auth, PedidosController.paterntalAlert)
//http://localhost:3000/pedidos/paterntalAlert

//Busqueda avanzada de Usuarios con alquiler
router.get('/avanzado/usuarios', auth, PedidosController.infoUsuarios)
//http://localhost:3000/pedidos/avanzado/usuarios

//Busqueda Avanzada de Usuarios por Nombre
router.get('/avanzado/usuarios/:nombre', auth, PedidosController.pedidoNombre)
//http://localhost:3000/pedidos/avanzado/usuarios/:nombre

//Borrar pedidos de Ususarios por Nombre
router.delete('/avanzado/usuarios/:nombre', auth, PedidosController.borrarNombre)
//http://localhost:3000/pedidos/avanzado/usuarios/:nombre

//Borrar pedidos por ID en DB
router.delete('/:id', auth, PedidosController.borrarPorId)
//http://localhost:3000/pedidos/:id

module.exports = router;