const model = require('../models/categories');
const { StatusCodes, validateId } = require('../utils');
const $pass = data => ({ error: false, success: true, data });
const $fail = data => ({ error: false, success: false, data });
const $pass_count = (data, count) => ({ ...$pass(data), count });

/**@param {string} source - erroring function name @param {Error} err - thrown error object */
const controllerError = (source, err, res) => {
    console.error(`\n<controllerError>\nError whilst running "controllers.categories.${source}":\n`, err, '\n</controllerError>\n');
    res.status(StatusCodes.InternalServerError).json({ error: true, success: false });
};

async function createCategory(req, res) {
    res.setHeader('Content-Type', 'application/json');
    try {
        let { title, description } = req.body;

        if (!title) return res.status(StatusCodes.NotAcceptable).json($fail('missing required parameters: title'));

        const { error, result } = await model.createCategory({
            title,
            description,
            createdBy: validateId(res.locals.userData._id),
            createdAt: Date.now()
        });
        console.log('createCategory', error, result);

        if (error) throw error;

        res.status(StatusCodes.Created).json($pass(result.insertedId));
    } catch (e) {
        controllerError('createCategory', e, res);
    }
}

async function getAll(req, res) {
    res.setHeader('Content-Type', 'application/json');

    try {
        const { error, result } = await model.getAllCategories();
        console.log('getAll(category)', error, result);
        if (error) throw error;
        res.status(StatusCodes.OK).json($pass_count(result, result.length));
    } catch (e) {
        controllerError('getAll', e, res);
    }
}

async function getCategoryById(req, res) {
    res.setHeader('Content-Type', 'application/json');

    const id = validateId(req.params.id);
    if (!id) return res.status(StatusCodes.NotAcceptable).json($fail('missing required parameters or bad data provided'));

    try {
        const { error, result } = await model.getCategoryById(id);
        console.log('getCategoryById', error, result);
        if (error) throw error;
        if (!result) return res.status(StatusCodes.NotFound).json($fail('resource not found'));
        res.status(StatusCodes.OK).json($pass(result));
    } catch (e) {
        controllerError('getCategoryById', e, res);
    }
}

async function getAllByUser(req, res) {
    res.setHeader('Content-Type', 'application/json');

    const id = validateId(req.params.id);
    if (!id) return res.status(StatusCodes.NotAcceptable).json($fail('missing required parameters or bad data provided'));

    try {
        const { error, result } = await model.getAllCategoriesByUserId(id);
        console.log('getAllByUser(category)', error, result);
        if (error) throw error;
        if (!result) return res.status(StatusCodes.NotFound).json($fail('resource not found'));
        res.status(StatusCodes.OK).json($pass(result));
    } catch (e) {
        controllerError('getCategoryByName', e, res);
    }
}

async function updateCategory(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const newData = req.body;

    const id = validateId(req.params.id);
    if (!id) return res.status(StatusCodes.NotAcceptable).json($fail('missing required parameters or bad data provided'));

    const oldData = await (await model.getCategoryById(id)).result;
    if (!oldData) return res.status(StatusCodes.NotFound).json($fail('resource not found'));

    if (
        (newData.title === oldData.title || newData.title === undefined) //
        && (newData.description === oldData.description || newData.description === undefined) //
        && (newData.createdBy === oldData.createdBy || newData.createdBy === undefined) //
        && (newData.createdAt === oldData.createdAt || newData.createdAt === undefined)
    )
        return res.status(StatusCodes.NotModified).json();

    const title = newData.title ?? oldData.title;
    const description = newData.description ?? oldData.description;
    const createdBy = newData.createdBy ?? oldData.createdBy;
    const createdAt = newData.createdAt ?? oldData.createdAt;

    try {
        const { error, result } = await model.updateCategory(id, { title, description, createdBy, createdAt });
        console.log('updateCategory', error, result);
        if (error) throw error;
        res.status(StatusCodes.NoContent).json();
    } catch (e) {
        controllerError('updateCategory', e, res);
    }
}

async function deleteCategory(req, res) {
    res.setHeader('Content-Type', 'application/json');

    const id = validateId(req.params.id);
    if (!id) return res.status(StatusCodes.NotAcceptable).json($fail('missing required parameters or bad data provided'));

    try {
        const { error, result } = await model.deleteCategory(id);
        console.log('deleteCategory', error, result);
        if (error) throw error;
        if (result.deletedCount === 0) return res.status(StatusCodes.NotFound).json($fail('resource not found'));
        res.status(StatusCodes.NoContent).json();
    } catch (e) {
        controllerError('deleteCategory', e, res);
    }
}

module.exports = { createCategory, getCategoryById, getAllByUser, getAll, updateCategory, deleteCategory };
