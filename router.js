const router = require('express').Router();

const UsuarioRouter = require('./views/UsuarioRouter');
const PeliculasRouter = require('./views/PeliculasRouter');
const OrdersRouter = require('./views/OrdersRouter');

router.use('/usuarios', UsuariosRouter);
router.use('/peliculas', PeliculasRouter);
router.use('/pedidos', PedidosRouter);

module.exports = router;