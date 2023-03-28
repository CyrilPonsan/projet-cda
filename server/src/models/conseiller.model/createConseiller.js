const { Conseiller } = require("../../services/sequelize");

async function createConseiller(newConseiller) {
  const checkConseiller = await Conseiller.findOne({
    where: { username: newConseiller.username },
  });
  if (checkConseiller) {
    return false;
  }
  const conseiller = await Conseiller.create(newConseiller);
  return conseiller;
}

module.exports = createConseiller;
