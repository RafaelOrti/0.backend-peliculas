const router = require('express').Router();

const UsuariosRouter = require('./views/UsuariosRouter');
const PeliculasRouter = require('./views/PeliculasRouter');
const PedidosRouter = require('./views/PedidosRouter');
const PagosRouter = require('./views/PagosRouter');

router.use('/usuarios', UsuariosRouter);
router.use('/peliculas', PeliculasRouter);
router.use('/pedidos', PedidosRouter);
router.use('/pagos', PagosRouter);


module.exports = router;