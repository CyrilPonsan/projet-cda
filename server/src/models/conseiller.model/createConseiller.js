const { Conseiller } = require("../../services/sequelize");

async function createConseiller(newConseiller) {
  const conseiller = await Conseiller.create(newConseiller);
}
