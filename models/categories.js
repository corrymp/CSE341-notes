const db = require('../db');
const userModel = require('./users');
const ObjectId = require('mongodb').ObjectId;
const { SchemaError, SchemaMissingError, SchemaTypeError } = require('../utils');

/**
 * @param {object} category - category data to check against
 * @returns {typeof category} original data if valid
 * @throws SchemaError if invalid
 */
const categorySchema = category => {
    if (typeof category !== 'object') throw new SchemaTypeError('category', 'object', category);

    try {
        const { title, description, createdBy, createdAt } = category;

        if (title === undefined || title === null) throw new SchemaMissingError('title', 'category');
        if (description === undefined || description === null) throw new SchemaMissingError('content', 'category');
        if (createdBy === undefined || createdBy === null) throw new SchemaMissingError('createdBy', 'category');
        if (createdAt === undefined || createdAt === null) throw new SchemaMissingError('createdAt', 'category');

        if (typeof title !== 'string') throw new SchemaTypeError('title', 'string', title);
        if (typeof description !== 'string') throw new SchemaTypeError('content', 'string', description);
        if (!(createdBy instanceof ObjectId)) throw new SchemaTypeError('createdBy', 'ObjectId', createdBy);
        if (typeof createdAt !== 'number') throw new SchemaTypeError('createdAt', 'number', createdAt);

        return category;
    } catch (e) {
        if (e instanceof SchemaError) throw e;
        throw new SchemaError(e.message);
    }
};

/**@param {object} category - data for new category */
async function createCategory(category) {
    try {
        return {
            error: null,
            result: await db.get().db().collection('Categories').insertOne(categorySchema(category))
        };
    } catch (e) {
        return {
            error: e,
            result: null
        };
    }
}

async function getAllCategories() {
    try {
        return {
            error: null,
            result: await (await db.get().db().collection('Categories').find()).toArray()
        };
    } catch (e) {
        return {
            error: e,
            result: null
        };
    }
}

/**@param {string} _id - id of category to lookup */
async function getCategoryById(_id) {
    try {
        return {
            error: null,
            result: await db.get().db().collection('Categories').findOne({ _id })
        };
    } catch (e) {
        return {
            error: e,
            result: null
        };
    }
}

/**
 * @param {string} _id - id of category to update
 * @param {object} category - data to set
 * */
async function updateCategory(_id, category) {
    try {
        return {
            error: null,
            result: await db
                .get()
                .db()
                .collection('Categories')
                .updateOne({ _id }, { $set: categorySchema(category) })
        };
    } catch (e) {
        return {
            error: e,
            result: null
        };
    }
}

/**@param {string} _id - id of category to delete */
async function deleteCategory(_id) {
    try {
        return {
            error: null,
            result: await db.get().db().collection('Categories').deleteOne({ _id })
        };
    } catch (e) {
        return {
            error: e,
            result: null
        };
    }
}

/**@param {string} _id - id of user to find categories from */
async function getAllCategoriesByUserId(_id) {
    try {
        const { error, result } = await userModel.getUserById(_id);
        if (error) throw error;
        if (!result) return { error: null, result: null };
        return {
            error: null,
            result: await (await db.get().db().collection('Categories').find({ createdBy: _id })).toArray()
        };
    } catch (e) {
        return {
            error: e,
            result: null
        };
    }
}

module.exports = { createCategory, getCategoryById, getAllCategoriesByUserId, getAllCategories, updateCategory, deleteCategory };
