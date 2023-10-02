const router = require('express').Router();
const WorkController = require('../controllers/work_controller');
const validateJWT = require('../middleware/validateJWT');

router.route('/getAllWork')
    .get(validateJWT, WorkController.findAll)

router.route('/getWorkById/:workId')
    .get(validateJWT, WorkController.findById)

router.route('/createWork')
    .post(validateJWT, WorkController.create)

module.exports = router;