// const express = require('express');
// const router = express.Router();
// const controller = require('../controllers/rawMaterial.controller');

// router.post('/', controller.createRawMaterial);
// router.get('/', controller.getRawMaterials);
// router.put('/:id', controller.updateRawMaterial);
// router.delete('/:id', controller.deleteRawMaterial);

// module.exports = router;
const express = require('express');
const router = express.Router();
const rawMaterialController = require('../controllers/rawMaterial.controller');

router.get('/raw-materials', rawMaterialController.getRawMaterials);
router.post('/raw-materials', rawMaterialController.createRawMaterial);
router.put('/raw-materials/:id', rawMaterialController.updateRawMaterial);
router.delete('/raw-materials/:id', rawMaterialController.deleteRawMaterial);

module.exports = router;
