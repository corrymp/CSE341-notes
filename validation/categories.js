const validate = require('.');

const createCategory = (req, res, next) =>
    validate(
        req,
        res,
        next,
        {
            title: 'required|string',
            description: 'required|string',
            createdBy: 'string',
            createdAt: 'integer'
        },
        {}
    );

const updateCategory = (req, res, next) =>
    validate(
        req,
        res,
        next,
        {
            title: 'string',
            description: 'string',
            createdBy: 'string',
            createdAt: 'integer'
        },
        {}
    );

module.exports = {
    createCategory,
    updateCategory
};
