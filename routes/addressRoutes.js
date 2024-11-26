const express = require('express');
const router = express.Router();

const addressController = require('../controllers/addressController');

router.get('/:user_id', addressController.getAddressByUser);
router.post('/', addressController.createAddress);
router.delete('/:id', addressController.deleteAddress);
router.post('/:id', addressController.updateAddress);

module.exports = router;