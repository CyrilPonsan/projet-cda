const { Conseiller } = require("../../services/sequelize");

async function getAllConseiller(offset, limit) {
  const conseillers = await Conseiller.findAll({
    attributes: ["id", "username", "prenom", "nom", "roles"],
    order: [["nom", "ASC"]],
    offset: offset,
    limit: limit,
    subQuery: false,
  });
  return conseillers;
}

module.exports = getAllConseiller;
