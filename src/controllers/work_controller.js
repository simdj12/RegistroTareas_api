const workController ={};
const {Work, TypeWork, StateWork, Responsible, EquipmentFacilities} = require('../db/sequelize');
const response = require('../utils/global_response');

function findOne(id) {
    return Work.findOne({
        where: {
            id
        }
    });
}

workController.create = (req, res) => {
    if(req.id_type_user >= 3){
        let data = req.body;
        Work.create({
            id_type_work: data.id_type_work,
            id_responsible: data.id_responsible,
            id_state_work: data.id_state_work,
            start_date: data.start_date,
            end_date: data.end_date,
            description: data.description,
            id_equipment_facilities: data.id_equipment_facilities,
        }).then((work) => {
            res.json(response({
                status: 'SUCCESS',
                data: work,
            }));
        }).catch((e) => {
            console.log(e);
            res.json(response({
                status: 'ERROR',
                msg: 'Error al registrar trabajo'
            })); 
        });
    } else {
        res.status(403).send();
    }
}

workController.findAll = (req, res, next) => {
    Work.findAll({
        include: [TypeWork, StateWork, Responsible, EquipmentFacilities],
        attributes: {exclude: ['id_type_work', 'id_state_work', 'id_responsible', 'id_equipment_facilities']},
    }).then(works => {
        res.json(response({
            status: 'SUCCESS',
            data: works
        }));
    }).catch((e) => {
        console.log(e);
        res.json(response({
            status: 'ERROR',
            msg: 'Error al buscar trabajos'
        }));
    });
};

workController.findPending = (req, res, next) => {
    Work.findAll({
        // where: {
        //     end_date
        // }
    }).then(works => {
        res.json(response({
            status: 'SUCCESS',
            data: works
        }));
    }).catch((e) => {
        res.json(response({
            status: 'ERROR',
            msg: 'Error al buscar trabajos'
        }));
    });
};

workController.findById = (req, res, next) => {
    const id = req.params.workId;
    findOne(id).then(work => {
        if(work){
            res.json(work)
        } else {
            res.status(404).send();
        }
    }).catch(next);
};

module.exports = workController;