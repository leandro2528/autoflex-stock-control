const express = require('express');
const router = express.Router();
const controller = require('../controllers/rawMaterial.controller');

router.post('/', controller.createRawMaterial);
router.get('/', controller.getRawMaterials);
router.put('/:id', controller.updateRawMaterial);
router.delete('/:id', controller.deleteRawMaterial);

module.exports = router;
