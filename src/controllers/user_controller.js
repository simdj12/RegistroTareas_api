const userController ={};
const {User, TypeUser} = require('../db/sequelize');
const response = require('../utils/global_response');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

function findOne(id) {
    return User.findOne({
        where: {
            id
        },
        include: TypeUser,
    });
}

function findByUsername(username) {
    return User.findOne({
        where: {
            username
        },
        include: TypeUser,
    });
}

function findByEmail(email) {
    return User.findOne({
        where: {
            email
        },
        include: TypeUser,
    });
}

userController.testToken = (req, res) => {
    let token = req.headers.authorization;
    jwt.verify(token, 'secret', (err, decoded) => {
        console.log(err);
        console.log(decoded);
        res.json(response({
            status: 'ERROR',
            msg: 'Usuario o Contraseña inválida',
            data: decoded
        }));
    })
}

userController.updateUserTypeUser = (req, res) => {
    if(req.id_type_user === 3){
        findOne(req.body.id_user).then(async (user) => {
            if(user) {
                try {
                    user.id_type_user = req.body.id_type_user;
                    await user.save();
                    findOne(user.id).then((user) => {
                        res.json(response({
                            status: 'SUCCESS',
                            msg: 'Cambio exitoso',
                            data: user,
                        }));
                    });
                } catch (error) {
                    res.json(response({
                        status: 'ERROR',
                        msg: 'Error al hacer el cambio'
                    }));
                }
            } else {
                res.json(response({
                    status: 'ERROR',
                    msg: 'Usuario no encontrado'
                }));
            }
        })
    } else {
        res.status(403).send();
    }
}

userController.updateUser = (req, res) => {
    if(req.body.id_user !== undefined && req.body.id_user !== null){
        if(req.body.id_user === req.id_user){
            findOne(req.body.id_user).then(async (user) => {
                if(user){
                    try {
                        user.email = req.body.email ? req.body.email : user.email;
                        user.username = req.body.username ? req.body.username : user.username;
                        await user.save();
                        findOne(user.id).then((user) => {
                            res.json(response({
                                status: 'SUCCESS',
                                msg: 'Cambio exitoso',
                                data: user,
                            }));
                        });
                    } catch (error) {
                        res.json(response({
                            status: 'ERROR',
                            msg: 'Error al hacer el cambio'
                        }));
                    }
                } else {
                    res.json(response({
                        status: 'ERROR',
                        msg: 'Usuario no encontrado'
                    }));
                }
            })
        } else {
            res.status(403).send();
        }
    } else {
        res.status(403).send();
    }
}

userController.loginUser = (req, res) => {
    let data = req.body;
    if(data.username === undefined || data.password === undefined){
        res.json(response({
            status: 'ERROR',
            msg: 'Usuario y/o Contraseña inválida'
        }));
    } else {
        findByUsername(data.username).then((user) => {
            if(user === null){
                res.json(response({
                    status: 'ERROR',
                    msg: 'Usuario y/o Contraseña inválida'
                }));
            } else {
                bcrypt.compare(data.password, user.password, (err, result) => {
                    if(result){
                        let token = jwt.sign({
                            status: user.status,
                            id_type_user: user.id_type_user,
                            id_user: user.id,
                        }, 'secret', { algorithm: 'HS256', expiresIn: 60 * 60 });
                        res.json(response({
                            status: 'SUCCESS',
                            msg: 'Sesion exitosa',
                            data: {
                                token: token,
                            }
                        }));
                    } else {
                        res.json(response({
                            status: 'ERROR',
                            msg: 'Usuario y/o Contraseña inválida'
                        }));
                    }
                });
            }
        });
    }
}

userController.createUser = (req, res) => {
    let data = req.body;

    findByUsername(data.username).then((user) => {
        if(user === null){
            findByEmail(data.email).then((user) => {
                if(user === null){
                    bcrypt.hash(data.password, saltRounds, (e, hash) => {
                        if(e){
                            console.log(e);
                            res.json(response({
                                status: 'ERROR',
                                msg: 'Error al registrar usuario'
                            }));
                        } else {
                            User.create({
                                username: data.username,
                                email: data.email,
                                password: hash,
                            }).then((user) => {
                                res.json(response({
                                    status: 'SUCCESS',
                                    data: user,
                                }));
                            }).catch((e) => {
                                console.log(e);
                                res.json(response({
                                    status: 'ERROR',
                                    msg: 'Error al registrar usuario'
                                })); 
                            });
                        }
                    });
                } else {
                    res.json(response({
                        status: 'ERROR',
                        msg: 'Usuario o Correo ya registrado'
                    })); 
                }
            }).catch((e) => {
                console.log(e);
                res.json(response({
                    status: 'ERROR',
                    msg: 'Error al registrar usuario'
                })); 
            });
        } else {
            res.json(response({
                status: 'ERROR',
                msg: 'Usuario o Correo ya registrado'
            })); 
        }
    }).catch((e) => {
        console.log(e);
        res.json(response({
            status: 'ERROR',
            msg: 'Error al registrar usuario'
        })); 
    });
};

// userController.setOwnerToUser = (req, res) => {
//     if(req.id_type_user >= 2){
//         findOne(req.body.id_user).then(async (user) => {
//             if(user) {
//                 user.id_owner = req.body.id_owner;
//                 await user.save();
//                 findOne(user.id).then((user) => {
//                     res.json(response({
//                         status: 'SUCCESS',
//                         msg: 'Asignación exitosa',
//                         data: user,
//                     }));
//                 });
//             } else {
//                 res.json(response({
//                     status: 'ERROR',
//                     msg: 'Usuario no encontrado'
//                 }));
//             }
//         })
//     } else {
//         res.status(403).send();
//     }
// }

userController.get = (req, res, next) => {

    User.findAll({ include: TypeUser }).then(users => {
        res.json(users)
    }).catch(e => {
        console.log(e);
        next();
    });
};

userController.getUser = (req, res, next) => {
    const id = req.params.userId;
    findOne(id).then(user => {
        if(user && user.length){
            res.json(user)
        } else {
            res.status(404).send();
        }
    }).catch(next);
};

userController.getUsers = (req, res, next) => {
    const id = req.params.userId;
    findOne(id).then(users => {
        if(users){
            res.json(users)
        } else {
            res.status(404).send();
        }
    }).catch(next);
};

userController.editUser = (req, res, next) => {
    const newUser = req.body;
    const id = newUser? newUser.id : undefined;
    findOne(id).then(user => {
        if (user) {
            Object.assign(user, newUser);
            user.save().then(user => res.json(user)).catch(next);
        }else {
            res.status(404).send();
        }
    }).catch(next);
};

userController.deleteUser = (req, res, next) => {
    const id = req.params.userId;
    findOne(id).then(user => {
        if (user) {
            user.destroy().then(res.status(200).send()).catch(next);
        }else {
            res.status(404).send();
        }
    }).catch(next);
};

module.exports = userController;