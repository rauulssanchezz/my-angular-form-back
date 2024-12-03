const express = require('express');
const router = express.Router();

const userController = require('../controllers/userControllers');

router.get('/',userController.getUsers);
router.post('/',userController.createUser);
router.get('/login',userController.getUserByCredentials);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);
router.get('/gmail/:gmail', userController.userExists);

module.exports = router;