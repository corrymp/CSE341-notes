const db = require('../db');
const categoryModel = require('./categories');
const userModel = require('./users');
const ObjectId = require('mongodb').ObjectId;
const { SchemaError, SchemaMissingError, SchemaTypeError } = require('../utils');

/**
 * @param {object} note - note data to check against
 * @returns {typeof note} original data if valid
 * @throws SchemaError if invalid
 */
const noteSchema = note => {
    if (typeof note !== 'object') throw new SchemaTypeError('note', 'object', note);

    try {
        const { title, content, createdBy, createdAt, edited } = note;

        if (title === undefined || title === null) throw new SchemaMissingError('title', 'note');
        if (content === undefined || content === null) throw new SchemaMissingError('content', 'note');
        if (createdBy === undefined || createdBy === null) throw new SchemaMissingError('createdBy', 'note');
        if (createdAt === undefined || createdAt === null) throw new SchemaMissingError('createdAt', 'note');

        if (typeof title !== 'string') throw new SchemaTypeError('title', 'string', title);
        if (typeof content !== 'string') throw new SchemaTypeError('content', 'string', content);
        if (!(createdBy instanceof ObjectId)) {
            if (ObjectId.isValid(createdBy)) note.createdBy = new ObjectId(createdBy);
            else throw new SchemaTypeError('createdBy', 'ObjectId', createdBy);
        }
        if (typeof createdAt !== 'number') throw new SchemaTypeError('createdAt', 'number', createdAt);
        if (edited !== undefined && typeof edited !== 'number') throw new SchemaTypeError('edited', 'number', edited);

        return note;
    } catch (e) {
        if (e instanceof SchemaError) throw e;
        throw new SchemaError(e.message);
    }
};

/**@param {object} note - data for new note */
async function createNote(note) {
    try {
        return {
            error: null,
            result: await db.get().db().collection('Notes').insertOne(noteSchema(note))
        };
    } catch (e) {
        return {
            error: e,
            result: null
        };
    }
}

async function getAllNotes() {
    try {
        return {
            error: null,
            result: await (await db.get().db().collection('Notes').find()).toArray()
        };
    } catch (e) {
        return {
            error: e,
            result: null
        };
    }
}

/**@param {string} _id - id of note to lookup */
async function getNoteById(_id) {
    try {
        return {
            error: null,
            result: await db.get().db().collection('Notes').findOne({ _id })
        };
    } catch (e) {
        return {
            error: e,
            result: null
        };
    }
}

/**@param {string} _id - id of user to find notes from */
async function getAllNotesByUserId(_id) {
    try {
        const { error, result } = await userModel.getUserById(_id);
        if (error) throw error;
        if (!result) return { error: null, result: null };
        return {
            error: null,
            result: await (await db.get().db().collection('Notes').find({ createdBy: _id })).toArray()
        };
    } catch (e) {
        return {
            error: e,
            result: null
        };
    }
}

/**@param {string} _id - id of category to find notes in */
async function getAllNotesInCategory(_id) {
    try {
        return {
            error: null,
            result: await (await db.get().db().collection('Notes').find({ category: _id })).toArray()
        };
    } catch (e) {
        return {
            error: e,
            result: null
        };
    }
}

/**
 * @param {string} _id - id of note to update
 * @param {object} note - data to set
 * */
async function updateNote(_id, note) {
    try {
        return {
            error: null,
            result: await db
                .get()
                .db()
                .collection('Notes')
                .updateOne({ _id }, { $set: noteSchema(note) })
        };
    } catch (e) {
        return {
            error: e,
            result: null
        };
    }
}

/**
 * @param {string} noteId - note id
 * @param {string} categoryId - category id
 * */
async function addNoteToCategory(noteId, categoryId) {
    try {
        const note = (await getNoteById(noteId)).result;
        if (!note) return { error: null, note: null, category: null };

        const category = (await categoryModel.getCategoryById(categoryId)).result;
        if (!category) return { error: null, note: true, category: null };
        if (note.category?.equals(categoryId)) return { error: null, note: true, category: true, success: false };

        note.category = category._id;
        updateNote(noteId, note);
        return { error: null, note: true, category: true, success: true };
    } catch (e) {
        return { error: e, note: null, category: null };
    }
}

/**@param {string} _id - id of note to delete*/
async function deleteNote(_id) {
    try {
        return {
            error: null,
            result: await db.get().db().collection('Notes').deleteOne({ _id })
        };
    } catch (e) {
        return {
            error: e,
            result: null
        };
    }
}

module.exports = { createNote, getAllNotes, getNoteById, getAllNotesByUserId, getAllNotesInCategory, updateNote, addNoteToCategory, deleteNote };
