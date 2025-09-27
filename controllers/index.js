const model = require('../models/users');
const { grantJwt } = require('../validation/login');
const { createUser, getUserByName } = require('../models/users');

module.exports = {
    home: async (req, res) => {
        if (!req.oidc.isAuthenticated()) {
            res.clearCookie('jwt');
            return res.send('Logged out (code o1)');
        }

        const user = req.oidc.user;
        const username = `${user.nickname}_${user.sub}`;
        const { error, result } = await getUserByName(username);

        if (error) {
            console.error(`Encountered error looking up user "${username}": ${error}`);
            return res.send('Logged out: error logging in (code f1)');
        }

        if (result) {
            grantJwt(res, result);
            return res.send('Logged in (code i1)');
        } else {
            const data = { username, ...user, createdAt: Date.now() };
            const { error, result } = await createUser(data);

            if (error) {
                console.error(`Encountered error creating new user "${username}": ${error}`);
                return res.send('Logged out: error logging in (code f2)');
            }

            if (!result) {
                return res.send('Logged out: error logging in (code f3)');
            }

            await grantJwt(res, { _id: result.insertedId, ...data });
            res.send('Logged in (code i2)');
        }
    },

    profile: (req, res) => {
        if (!req.oidc.isAuthenticated()) throw { status: 401 };
        res.status(200).json(req.oidc.user);
    },

    admin: async (req, res) => {
        if (!req.oidc.isAuthenticated()) throw { status: 404, message: '404' };
        const userList = await model.getAllUsers();
        res.status(userList.error ? 500 : 200).send(`<pre>${userList.error ? '\n<h1>There was an error fulfilling the request</h1>\n' : JSON.stringify(userList.result, null, 4)}</pre>`);
    }
};
