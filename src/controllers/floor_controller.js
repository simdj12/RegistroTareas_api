const floorController ={};
const {Floor} = require('../db/sequelize');
const response = require('../utils/global_response');

function findOne(id) {
    return Floor.findOne({
        where: {
            id
        }
    });
}

floorController.delete = (req, res) => {
    if(req.id_type_user >= 3){
        let data = req.body;
        findOne(data.id).then(async (floor) => {
            if(floor){
                try {
                    await floor.destroy();
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
                    msg: 'Piso no encontrado'
                }));
            }
        })
    } else {
        res.status(403).send();
    }
}

floorController.update = (req, res) => {
    if(req.id_type_user >= 3){
        let data = req.body;
        findOne(data.id).then(async (floor) => {
            if(floor){
                try {
                    floor.floor = data.floor ? data.floor : floor.floor;
                    await floor.save();
                    findOne(data.id).then((floor) => {
                        res.json(response({
                            status: 'SUCCESS',
                            msg: 'Cambio exitoso',
                            data: floor,
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
                    msg: 'Piso no encontrado'
                }));
            }
        })
    } else {
        res.status(403).send();
    }
}

floorController.create = (req, res) => {
    if(req.id_type_user >= 3){
        let data = req.body;
        Floor.create({
            floor: data.floor
        }).then((floor) => {
            res.json(response({
                status: 'SUCCESS',
                data: floor,
            }));
        }).catch((e) => {
            console.log(e);
            res.json(response({
                status: 'ERROR',
                msg: 'Error al registrar piso'
            })); 
        });
    } else {
        res.status(403).send();
    }
}

floorController.findAll = (req, res, next) => {
    Floor.findAll().then(floors => {
        res.json(response({
            status: 'SUCCESS',
            data: floors
        }));
    }).catch((e) => {
        res.json(response({
            status: 'ERROR',
            msg: 'Error al buscar pisos'
        }));
    });
};

floorController.findById = (req, res, next) => {
    const id = req.params.floorId;
    findOne(id).then(floor => {
        if(floor){
            res.json(floor)
        } else {
            res.status(404).send();
        }
    }).catch(next);
};

module.exports = floorController;