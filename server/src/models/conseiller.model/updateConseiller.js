const { Conseiller } = require("../../services/sequelize");

async function updateConseiller(conseillerToUpdate) {
  const updatedConseiller = await Conseiller.update(conseiller, {
    where: { id: conseillerToUpdate.id },
  });
  return updatedConseiller;
}

module.exports = updateConseiller;
