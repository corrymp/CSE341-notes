const model = require('../models/notes');
const { StatusCodes, validateId } = require('../utils');
const $pass = data => ({ error: false, success: true, data });
const $fail = data => ({ error: false, success: false, data });
const $pass_count = (data, count) => ({ ...$pass(data), count });

/**@param {string} source - erroring function name @param {Error} err - thrown error object */
const controllerError = (source, err, res) => {
    console.error(`\n<controllerError>\nError whilst running "controllers.notes.${source}":\n`, err, '\n</controllerError>\n');
    res.status(StatusCodes.InternalServerError).json({ error: true, success: false });
};

async function createNote(req, res) {
    res.setHeader('Content-Type', 'application/json');
    try {
        let { title, content } = req.body;

        if (!title || !content) return res.status(StatusCodes.NotAcceptable).json($fail(`missing required parameters: ${['title', 'content'].filter(param => !req.body[param]).join(', ')}`));

        const { error, result } = await model.createNote({
            title,
            content,
            createdBy: validateId(res.locals.userData._id),
            createdAt: Date.now()
        });

        if (error) throw error;

        res.status(StatusCodes.Created).json($pass(result.insertedId));
    } catch (e) {
        controllerError('createNote', e, res);
    }
}

async function getNoteById(req, res) {
    res.setHeader('Content-Type', 'application/json');

    const id = validateId(req.params.id);
    if (!id) return res.status(StatusCodes.NotAcceptable).json($fail('missing required parameters or bad data provided'));

    try {
        const { error, result } = await model.getNoteById(id);
        if (error) throw error;
        if (!result) return res.status(StatusCodes.NotFound).json($fail('resource not found'));
        res.status(StatusCodes.OK).json($pass(result));
    } catch (e) {
        controllerError('getNoteById', e, res);
    }
}

async function getAllByUser(req, res) {
    res.setHeader('Content-Type', 'application/json');

    const id = validateId(req.params.id);
    if (!id) return res.status(StatusCodes.NotAcceptable).json($fail('missing required parameters or bad data provided'));

    try {
        const { error, result } = await model.getAllNotesByUserId(id);
        if (error) throw error;
        if (!result) return res.status(StatusCodes.NotFound).json($fail('resource not found'));
        res.status(StatusCodes.OK).json($pass(result));
    } catch (e) {
        controllerError('getNoteByName', e, res);
    }
}

async function getAll(req, res) {
    res.setHeader('Content-Type', 'application/json');

    try {
        const { error, result } = await model.getAllNotes();
        if (error) throw error;
        res.status(StatusCodes.OK).json($pass_count(result, result.length));
    } catch (e) {
        controllerError('getAll', e, res);
    }
}

async function updateNote(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const newData = req.body;

    const id = validateId(req.params.id);
    if (!id) return res.status(StatusCodes.NotAcceptable).json($fail('missing required parameters or bad data provided'));

    const oldData = await (await model.getNoteById(id)).result;
    if (!oldData) return res.status(StatusCodes.NotFound).json($fail('resource not found'));

    if (
        (newData.title === oldData.title || newData.title === undefined) //
        && (newData.content === oldData.content || newData.content === undefined) //
        && (newData.createdBy === oldData.createdBy || newData.createdBy === undefined) //
        && (newData.createdAt === oldData.createdAt || newData.createdAt === undefined) //
    )
        return res.status(StatusCodes.NotModified).json();

    const title = newData.title ?? oldData.title;
    const content = newData.content ?? oldData.content;
    const createdBy = newData.createdBy ?? oldData.createdBy;
    const createdAt = newData.createdAt ?? oldData.createdAt;

    try {
        const { error } = await model.updateNote(id, { title, content, createdBy, createdAt, edited: Date.now() });
        if (error) throw error;
        res.status(StatusCodes.NoContent).json();
    } catch (e) {
        controllerError('updateNote', e, res);
    }
}

async function addNoteToCategory(req, res) {
    res.setHeader('Content-Type', 'application/json');

    const noteId = validateId(req.params.noteId);
    const categoryId = validateId(req.params.categoryId);
    if (!noteId || !categoryId) return res.status(StatusCodes.NotAcceptable).json($fail('missing required parameters or bad data provided'));

    try {
        const { error, note, category, success } = await model.addNoteToCategory(noteId, categoryId);
        if (error) throw error;
        if (!note && !category) return res.status(StatusCodes.NotFound).json($fail('no note or category found with ids'));
        if (!note) return res.status(StatusCodes.NotFound).json($fail('no note found with id'));
        if (!category) return res.status(StatusCodes.NotFound).json($fail('no category found with id'));
        if (!success) return res.status(StatusCodes.NotModified).json();

        res.status(StatusCodes.NoContent).json();
    } catch (e) {
        controllerError('addNoteToCategory', e, res);
    }
}

async function deleteNote(req, res) {
    res.setHeader('Content-Type', 'application/json');

    const id = validateId(req.params.id);
    if (!id) return res.status(StatusCodes.NotAcceptable).json($fail('missing required parameters or bad data provided'));

    try {
        const { error, result } = await model.deleteNote(id);
        if (error) throw error;
        if (result.deletedCount === 0) return res.status(StatusCodes.NotFound).json($fail('resource not found'));
        res.status(StatusCodes.NoContent).json();
    } catch (e) {
        controllerError('deleteNote', e, res);
    }
}

module.exports = { createNote, getNoteById, getAllByUser, getAll, updateNote, addNoteToCategory, deleteNote };
