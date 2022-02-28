
const authConfig = require('../config/auth');
const { Usuario } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

const UsuariosController = {};


//Funciones del controlador


///////////////Registro y login////////////

//Registro de usuarios
UsuariosController.registraUsuario = async (req, res) => {

    //Registrando un usuario
    console.log("Estamos dentro")
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let edad = req.body.edad;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    let numeroCuenta = req.body.numeroCuenta

    //Comprobación de errores.....
    Usuario.findAll({
        where: {

            [Op.or]: [
                {
                    email: {
                        [Op.like]: email
                    }
                }
            ]

        }
    }).then(datosRepetidos => {
        console.log("Hemos pasado la fase de comprobacion")
        if (datosRepetidos == 0) {
            Usuario.create({
                nombre: nombre,
                apellido: apellido,
                edad: edad,
                email: email,
                password: password,
                numeroCuenta: numeroCuenta
            }).then(usuario => {
                console.log("este es mi amigo", usuario);
                res.send(`Bienvenido, ${usuario.nombre}`);
            }).catch((error) => {
                res.send(error);
            });
        } else {
            res.send("El usuario con ese e-mail ya existe en nuestra base de datos");
        }
    }).catch(error => {
        res.send(error)
    });
    //Guardamos en sequelize el usuario



};



//Login de un usuario registrado
UsuariosController.loginUsuarios = (req, res) => {
    let correo = req.body.email;
    let password = req.body.password;

    Usuario.findOne({
        where: { email: correo }
    }).then(Usuario => {

        if (!Usuario) {
            res.send("Usuario o contraseña inválido");
        } else {
            //el usuario existe, por lo tanto, vamos a comprobar
            //si el password es correcto

            if (bcrypt.compareSync(password, Usuario.password)) { //COMPARA CONTRASEÑA INTRODUCIDA CON CONTRASEÑA GUARDADA, TRAS DESENCRIPTAR



                let token = jwt.sign({ usuario: Usuario }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });
                Usuario.token = token
                res.json({
                    usuario: Usuario,
                    token: token,
                    loginSucces: true
                })
            } else {
                res.status(401).json({ msg: "Usuario o contraseña inválidos" });
            }
        };


    }).catch(error => {
        res.send(error);
    })
};



///////////////Registro y login////////////

///////////////Acciones usuario////////////
///////////////Actualizar////////////


//Actualiza Datos por ID
UsuariosController.updateProfileId = async (req, res) => {

    let datos = req.body;
    let id = req.params.id

    try {

        Usuario.update(datos, {
            where: { id: id }
        })
            .then(actualizado => {
                res.send(actualizado)
            })

    } catch (error) {
        res.send(error)
    }

}



//Actualizar contraseña del usuario por id
UsuariosController.updatePasswordId = (req, res) => {


    let id = req.body.id;

    let oldPassword = req.body.oldPassword;

    let newPassword = req.body.newPassword;

    Usuario.findOne({
        where: { id: id }
    }).then(usuarioFound => {

        if (usuarioFound) {

            if (bcrypt.compareSync(oldPassword, usuarioFound.password)) {

                //En caso de que el Password antiguo SI sea el correcto....

                //1er paso..encriptamos el nuevo password....

                newPassword = bcrypt.hashSync(newPassword, Number.parseInt(authConfig.rounds));

                ////////////////////////////////7

                //2do paso guardamos el nuevo password en la base de datos

                let data = {
                    password: newPassword
                }

                console.log("esto es data", data);

                Usuario.update(data, {
                    where: { id: id }
                })
                    .then(actualizado => {
                        res.send(actualizado);
                    })
                    .catch((error) => {
                        res.status(401).json({ msg: `Ha ocurrido un error actualizando el password` });
                    });

            } else {
                res.status(401).json({ msg: "Usuario o contraseña inválidos" });
            }


        } else {
            res.send(`Usuario no encontrado`);
        }

    }).catch((error => {
        res.send(error);
    }));

};


//Actualizar a admin del usuario por id
UsuariosController.adminId = (req, res) => {


    let id = req.params.id;
    let newRol;

    Usuario.findOne({
        where: { id: id }
    }).then(usuarioFound => {

        if (usuarioFound) {

            if (usuarioFound.rol===0) {

                //En caso de que el rol antiguo SI sea el correcto....

                //1er paso..encriptamos el nuevo password....

                newRol = 1;

                ////////////////////////////////7

                //2do paso guardamos el nuevo password en la base de datos

                let data = {
                    rol: newRol
                }

                console.log("esto es data", data);

                Usuario.update(data, {
                    where: { id: id }
                })
                    .then(actualizado => {
                        res.send(actualizado);
                    })
                    .catch((error) => {
                        res.status(401).json({ msg: `Ha ocurrido un error actualizando el password` });
                    });

            } else {
                res.status(401).json({ msg: "Tu usuario ya es Admin" });
            }


        } else {
            res.send(`Usuario no encontrado`);
        }

    }).catch((error => {
        res.send(error);
    }));

};


//Actualiza Datos por email
UsuariosController.updateProfileEmail = async (req, res) => {

    let datos = req.body;
    let email = req.params.email

    try {

        Usuario.update(datos, {
            where: {email: email }
        })
            .then(actualizado => {
                res.send(actualizado)
            })

    } catch (error) {
        res.send(error)
    }

}



//Actualizar contraseña del usuario por id
UsuariosController.updatePasswordEmail = (req, res) => {


    let email = req.body.email;

    let oldPassword = req.body.oldPassword;

    let newPassword = req.body.newPassword;

    Usuario.findOne({
        where: { email: email }
    }).then(usuarioFound => {

        if (usuarioFound) {

            if (bcrypt.compareSync(oldPassword, usuarioFound.password)) {

                //En caso de que el Password antiguo SI sea el correcto....

                //1er paso..encriptamos el nuevo password....

                newPassword = bcrypt.hashSync(newPassword, Number.parseInt(authConfig.rounds));

                ////////////////////////////////7

                //2do paso guardamos el nuevo password en la base de datos

                let data = {
                    password: newPassword
                }

                console.log("esto es data", data);

                Usuario.update(data, {
                    where: { email: email }
                })
                    .then(actualizado => {
                        res.send(actualizado);
                    })
                    .catch((error) => {
                        res.status(401).json({ msg: `Ha ocurrido un error actualizando el password` });
                    });

            } else {
                res.status(401).json({ msg: "Usuario o contraseña inválidos" });
            }


        } else {
            res.send(`Usuario no encontrado`);
        }

    }).catch((error => {
        res.send(error);
    }));

};

//Actualizar a admin del usuario por email
UsuariosController.adminEmail = (req, res) => {


    let id = req.params.email;
    let newRol;

    Usuario.findOne({
        where: { email: email }
    }).then(usuarioFound => {

        if (usuarioFound) {

            if (usuarioFound.rol===0) {

                //En caso de que el rol antiguo SI sea el correcto....

                //1er paso..encriptamos el nuevo password....

                newRol = 1;

                ////////////////////////////////7

                //2do paso guardamos el nuevo password en la base de datos

                let data = {
                    rol: newRol
                }

                console.log("esto es data", data);

                Usuario.update(data, {
                    where: { email: email }
                })
                    .then(actualizado => {
                        res.send(actualizado);
                    })
                    .catch((error) => {
                        res.status(401).json({ msg: `Ha ocurrido un error actualizando el password` });
                    });

            } else {
                res.status(401).json({ msg: "Tu usuario ya es Admin" });
            }


        } else {
            res.send(`Usuario no encontrado`);
        }

    }).catch((error => {
        res.send(error);
    }));

};

///////////////Actualizar////////////


///////////////Acciones usuario////////////


///////////////Acciones superusuario////////////

//Búsqueda trayendo a todos los usuarios
UsuariosController.traeUsuarios = (req, res) => {

    Usuario.findAll()
        .then(data => {

            res.send(data)
        }).catch (error =>{
            res.send(error)
        })
};

UsuariosController.traerUsuarioId = (req, res) => {
    //Búsqueda buscando una Id
    Usuario.findByPk(req.params.id)
    .then(data => {
        res.send(data)
    });
};

UsuariosController.traerUsuarioEmail = (req, res) => {
    //Búsqueda comparando un campo
    Usuario.findOne({ where : { email : req.params.email }})
    .then(data => {
        res.send(data)
    });
};

UsuariosController.traerUsuarioNickname = (req, res) => {
    //Búsqueda comparando un campo
    Usuario.findOne({ where : { nickname : req.params.nickname }})
    .then(data => {
        res.send(data)
    });
};


//Borra todos los usuarios de la db
UsuariosController.deleteAll = async (req, res) => {

    try {

        Usuario.destroy({
            where: {},
            truncate: false
        })
            .then(usuariosEliminados => {
                res.send(`se han eliminado ${usuariosEliminados} usuarios`)
            })

    } catch (error) {
        res.send(error)
    }

};


//Borra Usuarios por ID
UsuariosController.deleteById = async (req, res) => {

    let id = req.params.id

    try {

        Usuario.destroy({
            where: { id: id },
            truncate: false
        })
            .then(usuariosEliminados => {
                res.send(`El usuario con la id ${id} ha sido eliminado ${usuariosEliminados}`)
            })

    } catch (error) {
        res.send(error)
    }

};


//Borra Usuarios por email
UsuariosController.deleteByEmail = async (req, res) => {

    let id = req.params.email

    try {

        Usuario.destroy({
            where: { email: email },
            truncate: false
        })
            .then(usuarioEliminados => {
                res.send(`El usuario con el email ${email} ha sido eliminado ${usuarioEliminados}`)
            })

    } catch (error) {
        res.send(error)
    }

};


//Borra Usuarios por nickname
UsuariosController.deleteByNickname = async (req, res) => {

    let id = req.params.nickname

    try {

        Usuario.destroy({
            where: { nickname: nickname },
            truncate: false
        })
            .then(usuarioEliminados => {
                res.send(`El usuario con el nickname ${nickname} ha sido eliminado ${usuarioEliminados}`)
            })

    } catch (error) {
        res.send(error)
    }

};





module.exports = UsuariosController;