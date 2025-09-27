if (!process.env.ENV_LOADED) require('dotenv').config();
const port = process.env.PORT;

require('./db').init(async (err, db) => {
    if (err) return console.error(err);

    const store = require('connect-mongo').create({
        client: db,
        dbName: 'session',
        ttl: 1820,
        autoRemove: 'interval',
        autoRemoveInterval: 31
    });

    const sessionData = {
        store,
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        name: 'sessionId'
    };

    const authData = {
        authRequired: false,
        auth0Logout: true,
        secret: process.env.OAUTH_SECRET,
        baseURL: process.env.BASE_URL,
        clientID: process.env.OAUTH_ID,
        issuerBaseURL: process.env.OAUTH_URL
    };

    const accessControl = (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    };

    const _404 = (req, res, next) => next({ status: 404, message: '404' });

    // eslint-disable-next-line
    const errorHandler = (err, req, res, next) => {
        if (err.status === 401) err.message = 'Unauthorized - please authenticate';
        else if (err.status !== 404) {
            console.error(`An error occured whilst accessing "${req.originalUrl}":`, err.message);
            err.message = 'An error occured whilst fulfilling the request.';
            console.dir(err);
        }

        res.status(err.status ?? 500).send(err.message);
    };

    const listening = () => console.log(`database conected - app listening on ${process.env.HOST}:${port}`);

    const bodyParser = require('body-parser');
    const { handleErrors } = require('./utils');
    const { verifyJwt } = require('./validation/login');

    console.log('Swagger loaded: ', await require('./utils/swagger')());

    require('express')()
        .disable('x-powered-by')
        .use(accessControl)
        .use(require('cors')())
        .use(require('express-session')(sessionData))
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: true }))
        .use(require('cookie-parser')())
        .use(require('express-openid-connect').auth(authData))
        .use(handleErrors(verifyJwt))
        .use(handleErrors(require('./routes')))
        .use(_404)
        .use(errorHandler)
        .listen(port, listening);
});
