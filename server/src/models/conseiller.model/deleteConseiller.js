const { Conseiller } = require("../../services/sequelize");

async function deleteConseiller(conseillerId) {
  console.log("id", conseillerId);
  const deletedConseiller = await Conseiller.destroy({
    where: { id: conseillerId },
  });
  return deletedConseiller;
}

module.exports = deleteConseiller;
