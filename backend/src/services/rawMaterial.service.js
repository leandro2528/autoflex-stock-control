const pool = require('../config/database');
const {
  createRawMaterial,
  getAllRawMaterials,
  updateRawMaterial,
  deleteRawMaterial
} = require('../models/rawMaterial.model');

const createRawMaterialService = async (data) => {
  const client = await pool.connect();
  try {
    const rm = await createRawMaterial(client, data);
    return rm;
  } finally {
    client.release();
  }
};

const getRawMaterialsService = async () => {
  const client = await pool.connect();
  try {
    return await getAllRawMaterials(client);
  } finally {
    client.release();
  }
};

const updateRawMaterialService = async (id, data) => {
  const client = await pool.connect();
  try {
    return await updateRawMaterial(client, id, data);
  } finally {
    client.release();
  }
};

const deleteRawMaterialService = async (id) => {
  const client = await pool.connect();
  try {
    return await deleteRawMaterial(client, id);
  } finally {
    client.release();
  }
};

module.exports = {
  createRawMaterialService,
  getRawMaterialsService,
  updateRawMaterialService,
  deleteRawMaterialService
};
