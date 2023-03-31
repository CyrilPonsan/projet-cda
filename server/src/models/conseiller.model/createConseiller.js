const { Conseiller } = require("../../services/sequelize");
const bcrypt = require("bcrypt");

async function createConseiller(newConseiller) {
  const checkConseiller = await Conseiller.findOne({
    where: { username: newConseiller.username },
  });
  if (checkConseiller) {
    return false;
  }
  newConseiller.password = await bcrypt.hash(newConseiller.password, 10);
  const conseiller = await Conseiller.create(newConseiller);
  return conseiller;
}

module.exports = createConseiller;
