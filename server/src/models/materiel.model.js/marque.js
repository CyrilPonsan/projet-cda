const { Marque } = require("../../services/sequelize");

async function getMarqueList() {
  const marqueList = await Marque.findAll();
  return marqueList;
}

async function createMarque(marque) {
  const marqueToAdd = await Marque.findOne({
    where: { marque: marque.marque },
  });
  if (marqueToAdd) {
    return false;
  }
  const newMarque = await TypeMateriel.create(marque);
  if (newMarque) {
    return newMarque;
  }
  return false;
}

module.exports = { getMarqueList, createMarque };
