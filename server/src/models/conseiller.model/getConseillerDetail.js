const { Conseiller } = require("../../services/sequelize");

async function getConseillerDetail(conseillerId) {
  console.log(conseillerId);
  const conseiller = await Conseiller.findOne({
    where: { id: conseillerId },
    attributes: ["id", "prenom", "nom", "username", "createdAt", "updatedAt"],
  });
  console.log(conseiller);
  if (conseiller) {
    return conseiller;
  }
  return false;
}

module.exports = getConseillerDetail;
