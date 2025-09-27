const router = require('express').Router();
const controller = require('../controllers/notes');
const { createNote, updateNote } = require('../validation/notes');

router.post('/', createNote, controller.createNote);
router.get('/', controller.getAll);
router.get('/:id', controller.getNoteById);
router.get('/by/:id', controller.getAllByUser);
router.put('/:id', updateNote, controller.updateNote);
router.put('/:noteId/:categoryId', controller.addNoteToCategory);
router.delete('/:id', controller.deleteNote);

module.exports = router;
