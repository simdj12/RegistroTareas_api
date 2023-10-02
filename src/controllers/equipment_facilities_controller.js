const equipmentFacilitiesController ={};
const {EquipmentFacilities, Floor} = require('../db/sequelize');
const response = require('../utils/global_response');

function findOne(id) {
    return EquipmentFacilities.findOne({
        where: {
            id
        }
    });
}

equipmentFacilitiesController.delete = (req, res) => {
    if(req.id_type_user >= 3){
        let data = req.body;
        findOne(data.id).then(async (equipmentFacility) => {
            if(equipmentFacility){
                try {
                    await equipmentFacility.destroy();
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
                    msg: 'Equipamiento e Instalacion no encontrado'
                }));
            }
        })
    } else {
        res.status(403).send();
    }
}

equipmentFacilitiesController.update = (req, res) => {
    if(req.id_type_user >= 3){
        let data = req.body;
        findOne(data.id).then(async (equipmentFacility) => {
            if(equipmentFacility){
                try {
                    equipmentFacility.name = data.name ? data.name : equipmentFacility.name;
                    equipmentFacility.id_floor = data.id_floor ? data.id_floor : equipmentFacility.id_floor;
                    equipmentFacility.description = data.description ? data.description : equipmentFacility.description;
                    await equipmentFacility.save();
                    findOne(data.id).then((equipmentFacility) => {
                        res.json(response({
                            status: 'SUCCESS',
                            msg: 'Cambio exitoso',
                            data: equipmentFacility,
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
                    msg: 'Equipamiento e Instalacion no encontrado'
                }));
            }
        })
    } else {
        res.status(403).send();
    }
}

equipmentFacilitiesController.create = (req, res) => {
    if(req.id_type_user >= 3){
        let data = req.body;
        EquipmentFacilities.create({
            name: data.name,
            id_floor: data.id_floor,
            description: data.description,
        }).then((equipmentFacilities) => {
            res.json(response({
                status: 'SUCCESS',
                data: equipmentFacilities,
            }));
        }).catch((e) => {
            console.log(e);
            res.json(response({
                status: 'ERROR',
                msg: 'Error al registrar equipo'
            })); 
        });
    } else {
        res.status(403).send();
    }
}

equipmentFacilitiesController.findAll = (req, res, next) => {
    EquipmentFacilities.findAll({
        include: Floor,
        attributes: {exclude: ['id_floor']},
    }).then(equipmentFacilitiess => {
        res.json(response({
            status: 'SUCCESS',
            data: equipmentFacilitiess
        }));
    }).catch((e) => {
        res.json(response({
            status: 'ERROR',
            msg: 'Error al buscar equipos'
        }));
    });
};

equipmentFacilitiesController.findById = (req, res, next) => {
    const id = req.params.equipmentFacilitiesId;
    findOne(id).then(equipmentFacilities => {
        if(equipmentFacilities){
            res.json(equipmentFacilities)
        } else {
            res.status(404).send();
        }
    }).catch(next);
};

module.exports = equipmentFacilitiesController;