const validate = require('.');

const createNote = (req, res, next) =>
    validate(
        req,
        res,
        next,
        {
            title: 'required|string',
            content: 'required|string',
            createdBy: 'string',
            createdAt: 'in:integer,null,undefined',
            edited: 'integer',
            category: 'string'
        },
        {}
    );

const updateNote = (req, res, next) =>
    validate(
        req,
        res,
        next,
        {
            title: 'string',
            content: 'string',
            createdBy: 'string',
            createdAt: 'integer',
            edited: 'integer',
            category: 'string'
        },
        {}
    );

module.exports = {
    createNote,
    updateNote
};
