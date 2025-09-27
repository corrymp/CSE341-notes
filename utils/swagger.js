let serverStarting = true;

if (!process.env.ENV_LOADED) {
    serverStarting = false;
    require('dotenv').config();
}

async function run() {
    try {
        const IN_DEV = process.env.NODE_ENVIRONMENT === 'development';

        const host = IN_DEV ? 'localhost:5341' : 'cmp-cse341-notes.onrender.com';
        const schemes = IN_DEV ? ['http', 'https'] : ['https'];

        const $200 = type => ({ error: false, success: true, count: 2, data: type });
        const $400 = msg => ({ error: false, success: false, data: msg });

        const user = {
            _id: 'ObjectID',
            username: 'username',
            createdAt: 1234567890
        };

        const note = {
            _id: 'ObjectID',
            title: 'Note Title',
            content: 'Note Content',
            createdBy: 'ObjectID',
            createdAt: 1234567890,
            category: 'ObjectId',
            edited: 1234567890
        };

        const category = {
            _id: 'ObjectID',
            title: 'Category title',
            description: 'Category description',
            createdBy: 'ObjectID',
            createdAt: 1234567890
        };

        await require('swagger-autogen')()('./utils/swagger.json', ['./utils/autogen.js'], {
            swagger: '2.0',
            info: {
                version: '1.0.0',
                title: 'Notes341 REST API',
                description: 'CSE 341 Week 03/04 Notes API'
            },
            host,
            basePath: '/',
            tags: [
                { name: 'users', description: 'endpoints for user management' },
                { name: 'notes', description: 'endpoints for note management' },
                { name: 'account', description: 'endpoints for account management and authentication' }
            ],
            schemes,
            securityDefinitions: {
                OAuth2: {
                    type: 'oauth2',
                    flow: 'implicit',
                    authorizationUrl: `${schemes[0]}://${host}/login`,
                    scopes: {
                        read: 'read information from the API',
                        write: 'write information to the API'
                    }
                }
            },
            consumes: ['application/json'],
            produces: ['application/json'],
            definitions: {
                '200_user': $200(user),
                '200_users': $200([user, user]),

                '200_note': $200(note),
                '200_notes': $200([note, note]),

                '200_category': $200(category),
                '200_categories': $200([category, category]),

                201: $200('Mongo:ObjectId'),
                404: $400('resource not found'),
                406: $400('missing required parameters or otherwise bad data provided'),
                500: { error: true, success: false }
            }
        });

        return true;
    } catch (e) {
        return false;
    }
}

if (serverStarting) module.exports = run;
else run();
