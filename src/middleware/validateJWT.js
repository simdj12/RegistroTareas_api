const jwt = require('jsonwebtoken');
const response = require('../utils/global_response');
// middleware to validate token (rutas protegidas)
const validateJWT = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) res.status(401).json(response({
        status: 'ERROR',
        msg: 'Full authentication is required'
    }));
    try {
        const verified = jwt.verify(token, 'secret')
        req.id_type_user = verified.id_type_user;
        req.id_user = verified.id_user;
        next()
    } catch (error) {
        res.status(401).json(response({
            status: 'ERROR',
            msg: 'Full authentication is required'
        }));
    }
}

module.exports = validateJWT;