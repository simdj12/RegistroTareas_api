const typeUserController ={};
const {TypeUser} = require('../db/sequelize');
const response = require('../utils/global_response');

function findOne(id) {
    return TypeUser.findOne({
        where: {
            id
        }
    });
}

typeUserController.create = (req, res) => {
    if(req.id_type_user >= 3){
        let data = req.body;
        TypeUser.create({
            type_user: data.type_user
        }).then((type_user) => {
            res.json(response({
                status: 'SUCCESS',
                data: type_user,
            }));
        }).catch((e) => {
            console.log(e);
            res.json(response({
                status: 'ERROR',
                msg: 'Error al registrar tipo de usuario'
            })); 
        });
    } else {
        res.status(403).send();
    }
}

typeUserController.findAll = (req, res, next) => {
    TypeUser.findAll().then(type_users => {
        res.json(response({
            status: 'SUCCESS',
            data: type_users
        }));
    }).catch((e) => {
        res.json(response({
            status: 'ERROR',
            msg: 'Error al buscar tipo de usuarios'
        }));
    });
};

typeUserController.findById = (req, res, next) => {
    const id = req.params.typeUserId;
    findOne(id).then(typeUser => {
        if(typeUser){
            res.json(typeUser)
        } else {
            res.status(404).send();
        }
    }).catch(next);
};

module.exports = typeUserController;