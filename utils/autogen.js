//* This is not the right way to do this, but I am tired of it breaking

//#region account
// #swagger.start
/*
    #swagger.path = '/'
    #swagger.method = 'get'
    #swagger.description = 'Home page - confirms a users logged-in status'
    #swagger.tags = ['account']
    #swagger.responses[200] = {description: 'Resource found and returned'}
    #swagger.responses[500] = {description: 'Internal server error'}
*/
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/profile'
    #swagger.method = 'get'
    #swagger.description = 'User profile information'
    #swagger.tags = ['account']
    #swagger.security = [{OAuth2: ['read']}]
    #swagger.responses[200] = {description: 'Resource found and returned'}
    #swagger.responses[401] = {description: 'Unauthorized - user must log in'}
    #swagger.responses[500] = {description: 'Internal server error'}
*/
// #swagger.end
//#endregion

//#region users
// #swagger.start
/*
    #swagger.path = '/users'
    #swagger.method = 'get'
    #swagger.description = 'Views all users. Can only be done with level 2 or higher.'
    #swagger.tags = ['users']
    #swagger.security = [{OAuth2: ['read']}]
    #swagger.responses[200] = {schema: {$ref: '#/definitions/200_users'}, description: 'Resource found and returned'}
    #swagger.responses[401] = {description: 'Unauthorized - user must log in'}
    #swagger.responses[500] = {schema: {$ref: '#/definitions/500'}, description: 'Internal server error'}
*/
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/users/{id}'
    #swagger.method = 'get'
    #swagger.description = 'Views a user. Can only be done by the user or with level 2 or higher.'
    #swagger.tags = ['users']
    #swagger.security = [{OAuth2: ['read','write']}]
    #swagger.parameters['id'] = {in: 'path', type: 'string', required: true}
    #swagger.responses[200] = {schema: {$ref: '#/definitions/200_user'}, description: 'Resource found and returned'}
    #swagger.responses[401] = {description: 'Unauthorized - user must log in'}
    #swagger.responses[404] = {schema: {$ref: '#/definitions/404'}, description: 'Resource not found'}
    #swagger.responses[406] = {schema: {$ref: '#/definitions/406'}, description: 'Missing required parameters or bad data provided'}
    #swagger.responses[500] = {schema: {$ref: '#/definitions/500'}, description: 'Internal server error'}
*/
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/users/username/{username}'
    #swagger.method = 'get'
    #swagger.description = 'Views a user. Can only be done by the user or with level 2 or higher.'
    #swagger.tags = ['users']
    #swagger.security = [{OAuth2: ['read']}]
    #swagger.parameters['username'] = {in: 'path', type: 'string', required: true}
    #swagger.responses[200] = {schema: {$ref: '#/definitions/200_user'}, description: 'Resource found and returned'}
    #swagger.responses[401] = {description: 'Unauthorized - user must log in'}
    #swagger.responses[404] = {schema: {$ref: '#/definitions/404'}, description: 'Resource not found'}
    #swagger.responses[500] = {schema: {$ref: '#/definitions/500'}, description: 'Internal server error'}
*/
// #swagger.end
//#endregion

//#region categories
// #swagger.start
/*
    #swagger.path = '/categories'
    #swagger.method = 'post'
    #swagger.description = 'Create a new category'
    #swagger.tags = ['categories']
    #swagger.security = [{OAuth2: ['read','write']}]
    #swagger.parameters['obj'] = {in: 'body', required: true, schema: {
        $title: 'Short label of the category',
        $description: 'Description of the category',
        createdBy: 'Mongo ObjectId',
        createdAt: 'number:timestamp'
    }}
    #swagger.responses[201] = {schema: {$ref: '#/definitions/201'}, description: 'Resource created and id returned'}
    #swagger.responses[401] = {description: 'Unauthorized - user must log in'}
    #swagger.responses[406] = {schema: {$ref: '#/definitions/406'}, description: 'Missing required parameters or bad data provided'}
    #swagger.responses[500] = {schema: {$ref: '#/definitions/500'}, description: 'Internal server error'}
*/
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/categories'
    #swagger.method = 'get'
    #swagger.description = 'View all categories.'
    #swagger.tags = ['categories']
    #swagger.security = [{OAuth2: ['read']}]
    #swagger.responses[200] = {schema: {$ref: '#/definitions/200_categories'}, description: 'Resource found and returned'}
    #swagger.responses[401] = {description: 'Unauthorized - user must log in'}
    #swagger.responses[500] = {schema: {$ref: '#/definitions/500'}, description: 'Internal server error'}
*/
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/categories/{id}'
    #swagger.method = 'get'
    #swagger.description = 'View a category.'
    #swagger.tags = ['categories']
    #swagger.security = [{OAuth2: ['read']}]
    #swagger.parameters['id'] = {in: 'path', type: 'string', required: true}
    #swagger.responses[200] = {schema: {$ref: '#/definitions/200_category'}, description: 'Resource found and returned'}
    #swagger.responses[401] = {description: 'Unauthorized - user must log in'}
    #swagger.responses[404] = {schema: {$ref: '#/definitions/404'}, description: 'Resource not found'}
    #swagger.responses[406] = {schema: {$ref: '#/definitions/406'}, description: 'Missing required parameters or bad data provided'}
    #swagger.responses[500] = {schema: {$ref: '#/definitions/500'}, description: 'Internal server error'}
*/
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/categories/{id}'
    #swagger.method = 'put'
    #swagger.description = 'Update a category.'
    #swagger.tags = ['categories']
    #swagger.security = [{OAuth2: ['read','write']}]
    #swagger.parameters['id'] = {in: 'path', type: 'string', required: true}
    #swagger.parameters['obj'] = {in: 'body', required: true, schema: {
        title: 'Short label of the category',
        description: 'Description of the category',
        createdBy: 'Mongo ObjectId',
        createdAt: 'number:time'
    }}
    #swagger.responses[204] = {description: 'Resource updated'}
    #swagger.responses[304] = {description: 'No changes from existing data'}
    #swagger.responses[401] = {description: 'Unauthorized - user must log in'}
    #swagger.responses[404] = {schema: {$ref: '#/definitions/404'}, description: 'Resource not found'}
    #swagger.responses[406] = {schema: {$ref: '#/definitions/406'}, description: 'Missing required parameters or bad data provided'}
    #swagger.responses[500] = {schema: {$ref: '#/definitions/500'}, description: 'Internal server error'}
*/
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/categories/{id}'
    #swagger.method = 'delete'
    #swagger.description = 'Removes a category.'
    #swagger.tags = ['categories']
    #swagger.security = [{OAuth2: ['read','write']}]
    #swagger.parameters['id'] = {in: 'path', type: 'string', required: true}
    #swagger.responses[204] = {description: 'Resource deleted'}
    #swagger.responses[401] = {description: 'Unauthorized - user must log in'}
    #swagger.responses[404] = {schema: {$ref: '#/definitions/404'}, description: 'Resource not found'}
    #swagger.responses[406] = {schema: {$ref: '#/definitions/406'}, description: 'Missing required parameters or bad data provided'}
    #swagger.responses[500] = {schema: {$ref: '#/definitions/500'}, description: 'Internal server error'}
*/
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/categories/by/{id}'
    #swagger.method = 'get'
    #swagger.description = 'View all categories made by a user.'
    #swagger.tags = ['categories']
    #swagger.security = [{OAuth2: ['read']}]
    #swagger.parameters['id'] = {in: 'path', type: 'string', required: true}
    #swagger.responses[200] = {schema: {$ref: '#/definitions/200_categories'}, description: 'Resource found and returned'}
    #swagger.responses[401] = {description: 'Unauthorized - user must log in'}
    #swagger.responses[404] = {schema: {$ref: '#/definitions/404'}, description: 'Resource not found'}
    #swagger.responses[406] = {schema: {$ref: '#/definitions/406'}, description: 'Missing required parameters or bad data provided'}
    #swagger.responses[500] = {schema: {$ref: '#/definitions/500'}, description: 'Internal server error'}
*/
// #swagger.end
//#endregion

//#region notes
// #swagger.start
/*
    #swagger.path = '/notes'
    #swagger.method = 'post'
    #swagger.description = 'Create a new note'
    #swagger.tags = ['notes']
    #swagger.security = [{OAuth2: ['read','write']}]
    #swagger.parameters['obj'] = {in: 'body', required: true, schema: {
        $title: 'Short label of the note',
        $content: 'Main content of the note',
        createdBy: 'Mongo ObjectId',
        createdAt: 'number:time',
        edited: 'number:time'
    }}
    #swagger.responses[201] = {schema: {$ref: '#/definitions/201'}, description: 'Resource created and id returned'}
    #swagger.responses[401] = {description: 'Unauthorized - user must log in'}
    #swagger.responses[406] = {schema: {$ref: '#/definitions/406'}, description: 'Missing required parameters or bad data provided'}
    #swagger.responses[500] = {schema: {$ref: '#/definitions/500'}, description: 'Internal server error'}
*/
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/notes'
    #swagger.method = 'get'
    #swagger.description = 'View all notes.'
    #swagger.tags = ['notes']
    #swagger.security = [{OAuth2: ['read']}]
    #swagger.responses[200] = {schema: {$ref: '#/definitions/200_notes'}, description: 'Resource found and returned'}
    #swagger.responses[401] = {description: 'Unauthorized - user must log in'}
    #swagger.responses[500] = {schema: {$ref: '#/definitions/500'}, description: 'Internal server error'}
*/
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/notes/{id}'
    #swagger.method = 'get'
    #swagger.description = 'View a note.'
    #swagger.tags = ['notes']
    #swagger.security = [{OAuth2: ['read']}]
    #swagger.parameters['id'] = {in: 'path', type: 'string', required: true}
    #swagger.responses[200] = {schema: {$ref: '#/definitions/200_note'}, description: 'Resource found and returned'}
    #swagger.responses[401] = {description: 'Unauthorized - user must log in'}
    #swagger.responses[404] = {schema: {$ref: '#/definitions/404'}, description: 'Resource not found'}
    #swagger.responses[406] = {schema: {$ref: '#/definitions/406'}, description: 'Missing required parameters or bad data provided'}
    #swagger.responses[500] = {schema: {$ref: '#/definitions/500'}, description: 'Internal server error'}
*/
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/notes/{id}'
    #swagger.method = 'put'
    #swagger.description = 'Update a note.'
    #swagger.tags = ['notes']
    #swagger.security = [{OAuth2: ['read','write']}]
    #swagger.parameters['id'] = {in: 'path', type: 'string', required: true}
    #swagger.parameters['obj'] = {in: 'body', required: true, schema: {
        title: 'Short label of the note',
        content: 'Main content of the note',
        createdBy: 'Mongo ObjectId',
        createdAt: 'number:time',
        edited: 'number:time'
    }}
    #swagger.responses[204] = {description: 'Resource updated'}
    #swagger.responses[304] = {description: 'No changes from existing data'}
    #swagger.responses[401] = {description: 'Unauthorized - user must log in'}
    #swagger.responses[404] = {schema: {$ref: '#/definitions/404'}, description: 'Resource not found'}
    #swagger.responses[406] = {schema: {$ref: '#/definitions/406'}, description: 'Missing required parameters or bad data provided'}
    #swagger.responses[500] = {schema: {$ref: '#/definitions/500'}, description: 'Internal server error'}
*/
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/notes/{noteId}/{categoryId}'
    #swagger.method = 'put'
    #swagger.description = 'Put a note in a category.'
    #swagger.tags = ['notes']
    #swagger.security = [{OAuth2: ['read','write']}]
    #swagger.parameters['noteId'] = {in: 'path', type: 'string', required: true}
    #swagger.parameters['categoryId'] = {in: 'path', type: 'string', required: true}
    #swagger.responses[204] = {description: 'Resource updated'}
    #swagger.responses[304] = {description: 'No changes from existing data'}
    #swagger.responses[401] = {description: 'Unauthorized - user must log in'}
    #swagger.responses[404] = {schema: {$ref: '#/definitions/404'}, description: 'Resource not found'}
    #swagger.responses[406] = {schema: {$ref: '#/definitions/406'}, description: 'Missing required parameters or bad data provided'}
    #swagger.responses[500] = {schema: {$ref: '#/definitions/500'}, description: 'Internal server error'}
*/
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/notes/{id}'
    #swagger.method = 'delete'
    #swagger.description = 'Removes a note.'
    #swagger.tags = ['notes']
    #swagger.security = [{OAuth2: ['read','write']}]
    #swagger.parameters['id'] = {in: 'path', type: 'string', required: true}
    #swagger.responses[204] = {description: 'Resource deleted'}
    #swagger.responses[401] = {description: 'Unauthorized - user must log in'}
    #swagger.responses[404] = {schema: {$ref: '#/definitions/404'}, description: 'Resource not found'}
    #swagger.responses[406] = {schema: {$ref: '#/definitions/406'}, description: 'Missing required parameters or bad data provided'}
    #swagger.responses[500] = {schema: {$ref: '#/definitions/500'}, description: 'Internal server error'}
*/
// #swagger.end

// #swagger.start
/*
    #swagger.path = '/notes/by/{id}'
    #swagger.method = 'get'
    #swagger.description = 'View all notes made by a user.'
    #swagger.tags = ['notes']
    #swagger.security = [{OAuth2: ['read']}]
    #swagger.parameters['id'] = {in: 'path', type: 'string', required: true}
    #swagger.responses[200] = {schema: {$ref: '#/definitions/200_notes'}, description: 'Resource found and returned'}
    #swagger.responses[401] = {description: 'Unauthorized - user must log in'}
    #swagger.responses[404] = {schema: {$ref: '#/definitions/404'}, description: 'Resource not found'}
    #swagger.responses[406] = {schema: {$ref: '#/definitions/406'}, description: 'Missing required parameters or bad data provided'}
    #swagger.responses[500] = {schema: {$ref: '#/definitions/500'}, description: 'Internal server error'}
*/
// #swagger.end
//#endregion
