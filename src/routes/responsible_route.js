const router = require('express').Router();
const ResponsibleController = require('../controllers/responsible_controller');
const validateJWT = require('../middleware/validateJWT');

router.route('/getAllResponsible')
    .get(validateJWT, ResponsibleController.findAll)

router.route('/getResponsibleById/:responsibleId')
    .get(validateJWT, ResponsibleController.findById)

router.route('/createResponsible')
    .post(validateJWT, ResponsibleController.create)

router.route('/updateResponsible')
    .post(validateJWT, ResponsibleController.update)

router.route('/deleteResponsible')
    .post(validateJWT, ResponsibleController.delete)

module.exports = router;