const { Modele } = require("../../services/sequelize");

async function getModeleList() {
  const modeleList = await Modele.findAll();
  return modeleList;
}

module.exports = { getModeleList };
