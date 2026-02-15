// src/controllers/rawMaterial.controller.js

const rawMaterialService = require('../services/rawMaterial.service');

const createRawMaterial = async (req, res) => {
  try {
    const material = await rawMaterialService.createRawMaterialService(req.body);
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRawMaterials = async (req, res) => {
  try {
    const materials = await rawMaterialService.getRawMaterialsService();
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRawMaterial = async (req, res) => {
  try {
    const material = await rawMaterialService.updateRawMaterialService(
      req.params.id,
      req.body
    );
    res.json(material);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRawMaterial = async (req, res) => {
  try {
    const result = await rawMaterialService.deleteRawMaterialService(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRawMaterial,
  getRawMaterials,
  updateRawMaterial,
  deleteRawMaterial
};
