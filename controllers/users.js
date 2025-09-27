const model = require('../models/users');
const { StatusCodes, validateId } = require('../utils');
const $pass = data => ({ error: false, success: true, data });
const $fail = data => ({ error: false, success: false, data });
const $pass_count = (data, count) => ({ ...$pass(data), count });

/**@param {string} source - erroring function name @param {Error} err - thrown error object */
const controllerError = (source, err, res) => {
    console.error(`\n<controllerError>\nError whilst running "controllers.users.${source}":\n`, err, '\n</controllerError>\n');
    res.status(StatusCodes.InternalServerError).json({ error: true, success: false });
};

async function getUserById(req, res) {
    res.setHeader('Content-Type', 'application/json');

    const id = validateId(req.params.id);
    if (!id) return res.status(StatusCodes.NotAcceptable).json($fail('missing required parameters or bad data provided'));

    try {
        const { error, result } = await model.getUserById(id);
        if (error) throw error;
        if (!result) return res.status(StatusCodes.NotFound).json($fail('user not found'));
        res.status(StatusCodes.OK).json($pass(result));
    } catch (e) {
        controllerError('getUserById', e, res);
    }
}

async function getUserByName(req, res) {
    res.setHeader('Content-Type', 'application/json');
    try {
        const { error, result } = await model.getUserByName(req.params.username);
        if (error) throw error;
        if (!result) return res.status(StatusCodes.NotFound).json($fail('user not found'));
        res.status(StatusCodes.OK).json($pass(result));
    } catch (e) {
        controllerError('getUserByName', e, res);
    }
}

async function getAll(req, res) {
    res.setHeader('Content-Type', 'application/json');
    try {
        const { error, result } = await model.getAllUsers();
        if (error) throw error;
        res.status(StatusCodes.OK).json($pass_count(result, result.length));
    } catch (e) {
        controllerError('getAll', e, res);
    }
}

//#region depricated
async function createUser(req, res) {
    console.warn('controllers.createUser is depricated and should no longer be used');
    res.setHeader('Content-Type', 'application/json');

    try {
        let { username, createdAt } = req.body;
        if (!username) return res.status(StatusCodes.NotAcceptable).json($fail(`malformed request: missing username`));
        if (!createdAt) createdAt = Date.now();
        const { error, result } = await model.createUser({ username, createdAt });
        if (error) throw error;
        res.status(StatusCodes.Created).json($pass(result.insertedId));
    } catch (e) {
        controllerError('createUser', e, res);
    }
}

async function updateUser(req, res) {
    console.warn('controllers.updateUser is depricated and should no longer be used');
    res.setHeader('Content-Type', 'application/json');
    const newData = req.body;

    const id = validateId(req.params.id);
    if (!id) return res.status(StatusCodes.NotAcceptable).json($fail('missing required parameters or bad data provided'));

    const oldData = (await model.getUserById(id)).result;
    if (!oldData) return res.status(StatusCodes.NotFound).json($fail('user not found'));

    if (
        (newData.username === oldData.username || newData.username === undefined) //
        && (newData.password === oldData.password || newData.password === undefined) //
        && (newData.permissionLevel === oldData.permissionLevel || newData.permissionLevel === undefined) //
        && (newData.createdAt === oldData.createdAt || newData.createdAt === undefined) //
        && (newData.notesLimit === oldData.notesLimit || newData.notesLimit === undefined)
    )
        return res.status(StatusCodes.NotModified).json();

    const { username, password, permissionLevel, createdAt, notesLimit } = { ...oldData, ...newData };

    try {
        const { error } = await model.updateUser(id, { username, password, permissionLevel, createdAt, notesLimit });
        if (error) throw error;
        res.status(StatusCodes.NoContent).json();
    } catch (e) {
        controllerError('updateUser', e, res);
    }
}

async function deleteUser(req, res) {
    console.warn('controllers.deleteUser is depricated and should no longer be used');
    res.setHeader('Content-Type', 'application/json');
    const id = validateId(req.params.id);
    if (!id) return res.status(StatusCodes.NotAcceptable).json($fail('missing required parameters or bad data provided'));
    try {
        const { error, result } = await model.deleteUser(id);
        if (error) throw error;
        if (result.deletedCount === 0) return res.status(StatusCodes.NotFound).json($fail('user not found'));
        res.status(StatusCodes.NoContent).json();
    } catch (e) {
        controllerError('deleteUser', e, res);
    }
}
//#endregion

module.exports = { createUser, getUserById, getUserByName, updateUser, deleteUser, getAll };
