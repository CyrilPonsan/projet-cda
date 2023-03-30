const bcrypt = require("bcrypt");

const { Conseiller } = require("../../services/sequelize");

async function updateConseiller(conseillerToUpdate) {
  if (conseillerToUpdate.password) {
    conseillerToUpdate.password = await bcrypt.hash(
      conseillerToUpdate.password,
      10
    );
  }
  if (conseillerToUpdate.isAdmin) {
    Object.assign(conseillerToUpdate, { roles: ["admin"] });
  } else {
    Object.assign(conseillerToUpdate, { roles: ["tech"] });
  }
  const updatedConseiller = await Conseiller.update(conseillerToUpdate, {
    where: { id: conseillerToUpdate.id },
  });
  return updatedConseiller;
}

module.exports = updateConseiller;
