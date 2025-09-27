const router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

router.use('/', require('./home'));
router.use('/api-docs', require('./docs'));
router.use('/users', requiresAuth(), require('./users'));
router.use('/categories', requiresAuth(), require('./categories'));
router.use('/notes', requiresAuth(), require('./notes'));
router.use(require('express').static('test'));

module.exports = router;
