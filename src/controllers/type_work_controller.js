const typeWorkController ={};
const {TypeWork} = require('../db/sequelize');
const response = require('../utils/global_response');

function findOne(id) {
    return TypeWork.findOne({
        where: {
            id
        }
    });
}

typeWorkController.delete = (req, res) => {
    if(req.id_type_user >= 3){
        let data = req.body;
        findOne(data.id).then(async (type_work) => {
            if(type_work){
                try {
                    await type_work.destroy();
                    res.json(response({
                        status: 'SUCCESS',
                        msg: 'Eliminado exitosamente'
                    }));
                } catch (error) {
                    res.json(response({
                        status: 'ERROR',
                        msg: 'Error al eliminar'
                    }));
                }
            } else {
                res.json(response({
                    status: 'ERROR',
                    msg: 'Tipo de Trabajo no encontrado'
                }));
            }
        })
    } else {
        res.status(403).send();
    }
}

typeWorkController.update = (req, res) => {
    if(req.id_type_user >= 3){
        let data = req.body;
        findOne(data.id).then(async (type_work) => {
            if(type_work){
                try {
                    type_work.type_work = data.type_work ? data.type_work : type_work.type_work;
                    await type_work.save();
                    findOne(data.id).then((type_work) => {
                        res.json(response({
                            status: 'SUCCESS',
                            msg: 'Cambio exitoso',
                            data: type_work,
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
                    msg: 'Tipo de Trabajo no encontrado'
                }));
            }
        })
    } else {
        res.status(403).send();
    }
}

typeWorkController.create = (req, res) => {
    if(req.id_type_user >= 3){
        let data = req.body;
        TypeWork.create({
            type_work: data.type_work
        }).then((type_work) => {
            res.json(response({
                status: 'SUCCESS',
                data: type_work,
            }));
        }).catch((e) => {
            console.log(e);
            res.json(response({
                status: 'ERROR',
                msg: 'Error al registrar tipo de trabajo'
            })); 
        });
    } else {
        res.status(403).send();
    }
}

typeWorkController.findAll = (req, res, next) => {
    TypeWork.findAll().then(type_works => {
        res.json(response({
            status: 'SUCCESS',
            data: type_works
        }));
    }).catch((e) => {
        res.json(response({
            status: 'ERROR',
            msg: 'Error al buscar tipo de trabajos'
        }));
    });
};

typeWorkController.findById = (req, res, next) => {
    const id = req.params.typeWorkId;
    findOne(id).then(typeWork => {
        if(typeWork){
            res.json(typeWork)
        } else {
            res.status(404).send();
        }
    }).catch(next);
};

module.exports = typeWorkController;