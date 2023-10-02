const router = require('express').Router();
const EquipmentFacilitiesController = require('../controllers/equipment_facilities_controller');
const validateJWT = require('../middleware/validateJWT');

router.route('/getAllEquipmentFacilities')
    .get(validateJWT, EquipmentFacilitiesController.findAll)

router.route('/getEquipmentFacilitiesById/:equipmentFacilitiesId')
    .get(validateJWT, EquipmentFacilitiesController.findById)

router.route('/createEquipmentFacilities')
    .post(validateJWT, EquipmentFacilitiesController.create)

router.route('/updateEquipmentFacilities')
    .post(validateJWT, EquipmentFacilitiesController.update)

router.route('/deleteEquipmentFacilities')
    .post(validateJWT, EquipmentFacilitiesController.delete)

module.exports = router;