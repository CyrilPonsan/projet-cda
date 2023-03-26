const { Conseiller } = require("../../services/sequelize");

async function getAllConseiller() {
  const conseillers = await Conseiller.findAll({
    attributes: ["id", "username", "prenom", "nom", "roles", "createdAt"],
    order: [["nom", "ASC"]],
  });
  return conseillers;
}

module.exports = getAllConseiller;
