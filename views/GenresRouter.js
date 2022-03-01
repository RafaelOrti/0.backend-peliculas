const express = require('express');
const GenreController = require('../controllers/GenreController');
const router = express.Router();
const { authentication, isAdmin } = require('../middleware/authentication');



router.get('/', authentication, GenreController.getGenres);
router.get('/name/:name', authentication, GenreController.getGenreByName);
router.post('/', authentication,isAdmin, GenreController.create);
router.put('/:id', authentication,isAdmin, GenreController.update);
router.delete('/', authentication,isAdmin, GenreController.delete);


module.exports = router;