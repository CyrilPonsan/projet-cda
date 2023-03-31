const { RaisonSociale } = require("../../services/sequelize");

async function getRaisonsSociales() {
  return await RaisonSociale.findAll();
}

async function addRaisonSociale(raisonSociale) {
  const tmp = await RaisonSociale.findOne({
    where: { raisonSociale: raisonSociale.raisonSociale },
  });
  if (tmp) {
    return false;
  }
  const newRaisonSociale = await RaisonSociale.create(raisonSociale);
  if (newRaisonSociale) {
    return newRaisonSociale;
  }
  return false;
}

async function deleteRaisonScoiale(raisonSocialeId) {
  const result = await RaisonSociale.destroy({
    where: { id: raisonSocialeId },
  });
  return result;
}

module.exports = { getRaisonsSociales, addRaisonSociale, deleteRaisonScoiale };
