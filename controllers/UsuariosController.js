
const { Usuarios } = require('../models/index');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');

const UsuariosController = {};


//Funciones del controlador

UsuariosController.traeUsuarios = (req, res) => {
    //Búsqueda trayendo a todos los Usuarios
    Usuarios.findAll()
    .then(data => {

        res.send(data)
    });

};

UsuariosController.traerUsuariosId = (req, res) => {
    //Búsqueda buscando una Id
    Usuarios.findByPk(req.params.id)
    .then(data => {
        res.send(data)
    });
};

UsuariosController.traerUsuariosEmail = (req, res) => {
    //Búsqueda comparando un campo
    Usuarios.findOne({ where : { email : req.params.email }})
    .then(data => {
        res.send(data)
    });
}

UsuariosController.registraUsuarios = async (req, res) => {
    
    //Registrando un Usuarios
    
        let name = req.body.name;
        let age = req.body.age;
        let surname = req.body.surname;
        let nickname = req.body.nickname;
        let email = req.body.email;
        console.log("antes de encriptar",req.body.password);
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds)); 
        let rol = req.body.rol||false;//en caso de que no funcione

        console.log("este es el password", password);
        //Comprobación de errores.....
        
        //Guardamos en sequelize el Usuarios

        Usuarios.findAll({
            where : {

                [Op.or] : [
                    {
                        email : {
                            [Op.like] : email
                        }
                    },
                    {
                        nickname : {
                            [Op.like] : nickname
                        }
                    }
                ]

            }

        }).then(datosRepetidos => {

            if(datosRepetidos == 0){

                    Usuarios.create({
                    name: name,
                    age: age,
                    surname: surname,
                    email: email,
                    password: password,
                    nickname: nickname,
                    rol,rol
                }).then(Usuarios => {
                    res.send(`Bienvenido, ${Usuarios.name}`);
                })
                .catch((error) => {
                    res.send(error);
                });

            }else {
                res.send("El Usuario con ese e-mail o nickname ya existe");
            }
        }).catch(error => {
            res.send(error)
        });

    
    
};

UsuariosController.updateProfile = async (req, res) => {

    let datos = req.body;

    let id = req.params.id;

    try {

        Usuarios.update(datos, {
            where: {id : id}
        })
        .then(actualizado => {
            res.send(actualizado);
        });

    } catch (error) {
        res.send(error);
    }

};

UsuariosController.updatePassword = (req,res) => {

    console.log("entramos");

    let id = req.body.id;

    let oldPassword = req.body.oldPassword;

    let newPassword = req.body.newPassword;

    Usuarios.findOne({
        where : { id : id}
    }).then(UsuariosFound => {

        if(UsuariosFound){

            if (bcrypt.compareSync(oldPassword, UsuariosFound.password)) {

                //En caso de que el Password antiguo SI sea el correcto....

                //1er paso..encriptamos el nuevo password....

                newPassword = bcrypt.hashSync(newPassword, Number.parseInt(authConfig.rounds)); 

                ////////////////////////////////7

                //2do paso guardamos el nuevo password en la base de datos

                let data = {
                    password: newPassword
                }

                console.log("esto es data",data);
                
                Usuarios.update(data, {
                    where: {id : id}
                })
                .then(actualizado => {
                    res.send(actualizado);
                })
                .catch((error) => {
                    res.status(401).json({ msg: `Ha ocurrido un error actualizando el password`});
                });

            }else{
                res.status(401).json({ msg: "Usuarios o contraseña inválidos" });
            }


        }else{
            res.send(`Usuarios no encontrado`);
        }

    }).catch((error => {
        res.send(error);
    }));

};

UsuariosController.deleteAll = async (req, res) => {

    try {

        Usuarios.destroy({
            where : {},
            truncate : false
        })
        .then(UsuariossEliminados => {
            res.send(`Se han eliminado ${UsuariossEliminados} Usuarioss`);
        })

    } catch (error) {
        res.send(error);
    }

};

UsuariosController.deleteById = async (req, res) => {

    let id = req.params.id;

    try {

        Usuarios.destroy({
            where : { id : id },
            truncate : false
        })
        .then(UsuariosEliminado => {
            console.log(UsuariosEliminado);
            res.send(`El Usuarios con la id ${id} ha sido eliminado`);
        })

    } catch (error) {
        res.send(error);
    }

};


UsuariosController.logUsuarios = (req, res) => {

    let correo = req.body.email;
    let password = req.body.password;

    Usuarios.findOne({
        where : {email : correo}
    }).then(Usuarios => {

        if(!Usuarios){
            res.send("Usuarios o contraseña inválido");
        }else {
            //el Usuarios existe, por lo tanto, vamos a comprobar
            //si el password es correcto

            if (bcrypt.compareSync(password, Usuarios.password)) { //COMPARA CONTRASEÑA INTRODUCIDA CON CONTRASEÑA GUARDADA, TRAS DESENCRIPTAR

                console.log(Usuarios.password);

                let token = jwt.sign({ Usuarios: Usuarios }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });

                res.json({
                    Usuarios: Usuarios,
                    token: token
                })
            } else {
                res.status(401).json({ msg: "Usuarios o contraseña inválidos" });
            }
        };


    }).catch(error => {
        res.send(error);
    })
};

module.exports = UsuariosController;