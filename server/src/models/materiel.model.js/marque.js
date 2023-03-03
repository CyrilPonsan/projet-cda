const { Marque } = require("../../services/sequelize");

async function getMarqueList() {
  const marqueList = await Marque.findAll();
  return marqueList;
}

module.exports = { getMarqueList };
