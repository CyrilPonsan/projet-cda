const { TypeMateriel } = require("../../services/sequelize");

async function getTypeMaterielList() {
  const typeMaterielList = await TypeMateriel.findAll();
  return typeMaterielList;
}

async function createTypeMaterielList(typeMateriel) {
  const newTypeMateriel = await TypeMateriel.create(typeMateriel);
  if (newTypeMateriel) {
    return newTypeMateriel;
  }
  return false;
}

module.exports = { getTypeMaterielList, createTypeMaterielList };
