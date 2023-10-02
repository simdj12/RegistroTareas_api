const companyController ={};
const {Company} = require('../db/sequelize');
const response = require('../utils/global_response');

function findOne(id) {
    return Company.findOne({
        where: {
            id
        }
    });
}

companyController.delete = (req, res) => {
    if(req.id_type_user >= 3){
        let data = req.body;
        findOne(data.id).then(async (company) => {
            if(company){
                try {
                    await company.destroy();
                    res.json(response({
                        status: 'SUCCESS',
                        msg: 'Eliminado exitosamente'
                    }));
                } catch (error) {
                    console.log(error);
                    res.json(response({
                        status: 'ERROR',
                        msg: 'Error al eliminar'
                    }));
                }
            } else {
                res.json(response({
                    status: 'ERROR',
                    msg: 'Compañia no encontrada'
                }));
            }
        })
    } else {
        res.status(403).send();
    }
}

companyController.update = (req, res) => {
    if(req.id_type_user >= 3){
        let data = req.body;
        findOne(data.id).then(async (company) => {
            if(company){
                try {
                    company.company_name = data.company_name ? data.company_name : company.company_name;
                    company.contact_phone = data.contact_phone ? data.contact_phone : company.contact_phone;
                    await company.save();
                    findOne(data.id).then((company) => {
                        res.json(response({
                            status: 'SUCCESS',
                            msg: 'Cambio exitoso',
                            data: company,
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
                    msg: 'Compañia no encontrada'
                }));
            }
        })
    } else {
        res.status(403).send();
    }
}

companyController.create = (req, res) => {
    if(req.id_type_user >= 3){
        let data = req.body;
        Company.create({
            company_name: data.company_name,
            contact_phone: data.contact_phone,
        }).then((company) => {
            res.json(response({
                status: 'SUCCESS',
                data: company,
            }));
        }).catch((e) => {
            console.log(e);
            res.json(response({
                status: 'ERROR',
                msg: 'Error al registrar compañia'
            })); 
        });
    } else {
        res.status(403).send();
    }
}

companyController.findAll = (req, res, next) => {
    Company.findAll().then(company => {
        res.json(response({
            status: 'SUCCESS',
            data: company
        }));
    }).catch((e) => {
        res.json(response({
            status: 'ERROR',
            msg: 'Error al buscar compañias'
        }));
    });
};

companyController.findById = (req, res, next) => {
    const id = req.params.companyId;
    findOne(id).then(company => {
        if(company){
            res.json(company)
        } else {
            res.status(404).send();
        }
    }).catch(next);
};

module.exports = companyController;