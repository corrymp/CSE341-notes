const Validator = require('validatorjs');
const StatusCodes = require('../utils').StatusCodes;

const validate = (req, res, next, rules, messages) => {
    const validation = new Validator(req.body, rules, messages);
    validation.passes(() => next());
    validation.fails(() => {
        res.status(StatusCodes.NotAcceptable).json({
            error: false,
            success: false,
            data: Object.entries(validation.errors.errors).map(([k, v]) => `${k}: ${v.join('; ')}`)
        });
    });
};

module.exports = validate;
