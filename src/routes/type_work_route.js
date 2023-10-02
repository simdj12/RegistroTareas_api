const router = require('express').Router();
const TypeWorkController = require('../controllers/type_work_controller');
const validateJWT = require('../middleware/validateJWT');

router.route('/getAllTypeWork')
    .get(validateJWT, TypeWorkController.findAll)

router.route('/getTypeWorkById/:typeWorkId')
    .get(validateJWT, TypeWorkController.findById)

router.route('/createTypeWork')
    .post(validateJWT, TypeWorkController.create)

router.route('/updateTypeWork')
    .post(validateJWT, TypeWorkController.update)

router.route('/deleteTypeWork')
    .post(validateJWT, TypeWorkController.delete)

module.exports = router;