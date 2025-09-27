const jwt = require('jsonwebtoken');

/**
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next callback
 * @description verifies authenticity of JWT; pass: calls next function; else: redirect to login
 */
const verifyJwt = (req, res, next) => {
    if (req.cookies.jwt) {
        jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) {
                res.clearCookie('jwt');
                res.status(401).send('<h1>Unauthorized</h1>');
                return;
            }
            res.locals.loggedin = 1;
            res.locals.userData = data;
        });
    }

    next();
};

/**
 * @param {Response} res - Express response object
 * @param {Object} accountData - Data of account
 * @param {Function} cb - callback function
 * @param {Number} duration - time till cookie expires in miliseconds; default: 1 hour
 * @description issue new JsonWebToken
 */
const grantJwt = (res, data, cb, duration = 3600000) => {
    if (data.password) delete data.password;

    res.cookie('jwt', jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: duration }), { httpOnly: true, maxAge: duration, secure: process.env.NODE_ENV !== 'development' });
    res.locals.loggedin = 1;
    res.locals.userData = data;

    if (cb) cb();
};

module.exports = { verifyJwt, grantJwt };
