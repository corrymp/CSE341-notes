const router = require('express').Router();
const controller = require('../controllers/categories');
const { createCategory, updateCategory } = require('../validation/categories');

router.post('/', createCategory, controller.createCategory);
router.get('/', controller.getAll);
router.get('/:id', controller.getCategoryById);
router.get('/by/:id', controller.getAllByUser);
router.put('/:id', updateCategory, controller.updateCategory);
router.delete('/:id', controller.deleteCategory);

module.exports = router;
