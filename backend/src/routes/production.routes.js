const express = require('express');
const router = express.Router();

const productionController = require('../controllers/production.controller');

router.get('/production/capacity', productionController.getProductionCapacity);

module.exports = router;
