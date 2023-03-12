const { Conseiller } = require("../../services/sequelize");

async function getConseillerDetail(conseillerId) {
  const conseiller = await Conseiller.findOne({
    where: { id: conseillerId },
    attributes: ["id", "prenom", "nom", "username", "createdAt", "updatedAt"],
  });
  if (conseiller) {
    return conseiller;
  }
  return false;
}

module.exports = getConseillerDetail;
