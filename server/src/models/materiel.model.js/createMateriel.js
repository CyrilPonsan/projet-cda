const { Materiel, Client } = require("../../services/sequelize");

async function createMateriel(materielToAdd) {
  const client = await Client.findByPk(materielToAdd.clientId);
  if (!client) {
    return false;
  }

  materielToAdd = { ...materielToAdd, ref: await _getMaterielLastRef() };
  const newMateriel = await Materiel.create(materielToAdd);
  if (newMateriel) {
    return newMateriel;
  }
  return false;
}

async function _getMaterielLastRef() {
  const materiels = await Materiel.findAll({ order: [["id", "DESC"]] });
  return parseInt(materiels[0].ref) + 1 || 1000;
}

module.exports = createMateriel;
