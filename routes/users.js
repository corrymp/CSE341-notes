const router = require('express').Router();
const controller = require('../controllers/users');

router.get('/', controller.getAll);
router.get('/:id', controller.getUserById);
router.get('/username/:username', controller.getUserByName);

module.exports = router;
