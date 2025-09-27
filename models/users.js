const db = require('../db');
const { SchemaError, SchemaMissingError, SchemaTypeError } = require('../utils');

/**
 * @param {object} user - user data to check against
 * @returns {typeof user} original data if valid
 * @throws SchemaError if invalid
 */
const userSchema = user => {
    if (typeof user !== 'object') throw new SchemaTypeError('user', 'object', user);

    try {
        const { username, createdAt } = user;

        if (username === undefined || username === null) throw new SchemaMissingError('username', 'user');
        if (createdAt === undefined || createdAt === null) throw new SchemaMissingError('createdAt', 'user');

        if (typeof username !== 'string') throw new SchemaTypeError('username', 'string', username);
        if (typeof createdAt !== 'number') throw new SchemaTypeError('createdAt', 'number', createdAt);

        return user;
    } catch (e) {
        if (e instanceof SchemaError) throw e;
        throw new SchemaError(e.message);
    }
};

/**@param {object} user - data for new user */
async function createUser(user) {
    try {
        return {
            error: null,
            result: await db.get().db().collection('Users').insertOne(userSchema(user))
        };
    } catch (e) {
        return { error: e, result: null };
    }
}

async function getAllUsers() {
    try {
        return {
            error: null,
            result: await (await db.get().db().collection('Users').find()).toArray()
        };
    } catch (e) {
        return { error: e, result: null };
    }
}

/**@param {string} id - id of user to perform lookup on*/
async function getUserById(id) {
    try {
        return {
            error: null,
            result: await db.get().db().collection('Users').findOne({ _id: id })
        };
    } catch (e) {
        return { error: e, result: null };
    }
}

/**@param {string} username - username of user to perform lookup on*/
async function getUserByName(username) {
    try {
        return {
            error: null,
            result: await db.get().db().collection('Users').findOne({ username })
        };
    } catch (e) {
        return { error: e, result: null };
    }
}

/**
 * @param {string} id - id of user to update
 * @param {object} contact - data to set
 * */
async function updateUser(id, contact) {
    try {
        return {
            error: null,
            result: await db
                .get()
                .db()
                .collection('Users')
                .updateOne({ _id: id }, { $set: userSchema(contact) })
        };
    } catch (e) {
        return { error: e, result: null };
    }
}

/**@param {string} id - id of user to delete*/
async function deleteUser(id) {
    try {
        return {
            error: null,
            result: await db.get().db().collection('Users').deleteOne({ _id: id })
        };
    } catch (e) {
        return { error: e, result: null };
    }
}

module.exports = { createUser, getUserById, getUserByName, getAllUsers, updateUser, deleteUser };
