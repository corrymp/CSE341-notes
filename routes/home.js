const router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');
const controller = require('../controllers');

router.get('/', controller.home);
router.get('/profile', requiresAuth(), controller.profile);
router.get('/admin', controller.admin);

module.exports = router;
