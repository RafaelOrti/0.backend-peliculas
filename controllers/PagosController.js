const axios = require('axios');
const PagosController = {};
const { Pago } = require('../models/index');
const { Op } = require('sequelize')



//Funciones del controlador
const key = '210d6a5dd3f16419ce349c9f1b200d6d'



//Registro de Pagos en la BD propia
PagosController.registraPago = (req, res) => {

    let tarjeta = req.body.tarjeta;
    let paypal = req.body.paypal;
    let usuarioId = req.body.usuarioId;
   
    


    //////////////OPCION INICIAL PARA CREAR pago /////////////////
    Pago.create({
        tarjeta: tarjeta,
        paypal: paypal,
        usuarioId: usuarioId
    }).then(pago => {
        if (pago) {
            res.send(pago)
        } else {
            res.send("La creación de un nuevo pago ha fallado");
        }
    }).catch((error => {
        res.send(error)
    }))

};




//ACTUALIZAR Pago DB propia
PagosController.actualizarPago = (req, res) => {

    let id = req.params.id;
 
    let datos = req.body;
    try {

        Pago.update(datos,{
            where: { id: id }
        })
            .then(PagoDel => {
                res.send(`El Pago ${id} ha sido actualizado`)
            })

    } catch (error) {
        res.send(error)
    }

}


//Busca Pagos por Genero En propia BD
PagosController.leerPago = (req, res) => {

    let id = req.params.id;

    Pago.findAll({
        where: { id: id }
    }).then(Pago => {
        res.send(Pago)
    }).catch(error => {
        res.send(error)
    })

}

//Borrar Pagos por ID en DB
PagosController.borrarPago = async (req, res) => {

    let id = req.params.id

    let consulta = `DELETE FROM Pagos WHERE (id = ${id});`;

    try {
        let resultado = await Pago.sequelize.query(consulta, {
            type: Pago.sequelize.QueryTypes.DELETE
        });

        if (resultado != 0) {
            res.send("Pago eliminado con exito!");
        } else {
            res.send("Ha ocurrido algun error al borrar los Pagos")
        }

    } catch (error) {
        res.send(error)
    }

}


module.exports = PagosController;