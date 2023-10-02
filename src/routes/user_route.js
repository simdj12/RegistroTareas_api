const router = require('express').Router();
const UserController = require('../controllers/user_controller');
const validateJWT = require('../middleware/validateJWT');

// router.route('/setOwnerToUser')
//     .post(validateJWT, UserController.setOwnerToUser)

router.route('/updateUserTypeUser')
    .post(validateJWT, UserController.updateUserTypeUser)

router.route('/testToken')
    .post(validateJWT, UserController.testToken)

router.route('/login')
    .post(UserController.loginUser)

router.route('/register')
    .post(UserController.createUser)

router.route('/users')
    // .post(UserController.createUser) // to create new subordinate resources
    .get(UserController.get); // to retrieve resource representation/information only

router.route('/updateUser')
    .post(validateJWT, UserController.updateUser)
// router.route('/users/:userId')
//     .get(UserController.getUsers) // to retrieve resource representation/information only
//     .put(UserController.editUser) // to update existing resource
//     .delete(UserController.deleteUser)  // to delete resources
//     .patch(()=>{}); // to make partial update on a resource

module.exports = router;