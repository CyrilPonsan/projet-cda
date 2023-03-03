const { TypeMateriel } = require("../../services/sequelize");

async function getTypeMaterielList() {
  const typeMaterielList = await TypeMateriel.findAll();
  return typeMaterielList;
}

async function createTypeMateriel(typeMateriel) {
  const materielToAdd = await TypeMateriel.findOne({
    where: { type: typeMateriel.type },
  });
  if (materielToAdd) {
    return false;
  }
  const newTypeMateriel = await TypeMateriel.create(typeMateriel);
  if (newTypeMateriel) {
    return newTypeMateriel;
  }
  return false;
}

module.exports = { getTypeMaterielList, createTypeMateriel };
