const productionService = require('../services/production.service');

const getProductionCapacity = async (req, res) => {
  try {
    const result = await productionService.getProductionCapacity();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error calculating production capacity' });
  }
};

module.exports = {
  getProductionCapacity
};
