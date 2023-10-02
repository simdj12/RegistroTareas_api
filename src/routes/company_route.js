const router = require('express').Router();
const CompanyController = require('../controllers/company_controller');
const validateJWT = require('../middleware/validateJWT');

router.route('/getAllCompany')
    .get(validateJWT, CompanyController.findAll)

router.route('/getCompanyById/:companyId')
    .get(validateJWT, CompanyController.findById)

router.route('/createCompany')
    .post(validateJWT, CompanyController.create)

router.route('/updateCompany')
    .post(validateJWT, CompanyController.update)

router.route('/deleteCompany')
    .post(validateJWT, CompanyController.delete)

module.exports = router;