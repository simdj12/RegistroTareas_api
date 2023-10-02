const router = require('express').Router();
const TypeUserController = require('../controllers/type_user_controller');
const validateJWT = require('../middleware/validateJWT');

router.route('/getAllTypeUser')
    .get(validateJWT, TypeUserController.findAll)

router.route('/getTypeUserById/:typeUserId')
    .get(validateJWT, TypeUserController.findById)

router.route('/createTypeUser')
    .post(validateJWT, TypeUserController.create)

module.exports = router;