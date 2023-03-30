const { Conseiller } = require("../../services/sequelize");

async function deleteConseiller(conseillerId) {
  const deletedConseiller = await Conseiller.update(
    { roles: ["inactif"] },
    {
      where: { id: conseillerId },
    }
  );
  if (deletedConseiller[0] === 0) {
    return false;
  }
  return deletedConseiller;
}

module.exports = deleteConseiller;
