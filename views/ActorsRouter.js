const express = require('express');
const ActorController = require('../controllers/ActorController');
const router = express.Router();
const { authentication, isAdmin } = require('../middleware/authentication');



router.get('/', authentication, ActorController.getActors);
router.get('/name/:name',authentication, ActorController.getActorByName);
router.post('/', authentication,isAdmin ,ActorController.create);
router.put('/:id', authentication,isAdmin ,ActorController.update);
router.delete('/', authentication,isAdmin, ActorController.delete);


module.exports = router;