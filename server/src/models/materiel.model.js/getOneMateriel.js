const {
  Materiel,
  Marque,
  TypeMateriel,
  Modele,
  RaisonSociale,
} = require("../../services/sequelize");

async function getOneMateriel(ref, clientId) {
  const materiel = await Materiel.findOne({
    where: { ref: ref, clientId: clientId },
    include: [
      { model: TypeMateriel, as: "typeMateriel" },
      { model: Marque, as: "marque" },
      { model: Modele, as: "modele" },
    ],
  });
  console.log("id", materiel);
  if (materiel) {
    const client = await materiel.getClient({
      include: [
        {
          model: RaisonSociale,
          as: "raisonSociale",
        },
      ],
    });
    return { materiel, client };
  }
  return false;
}

module.exports = getOneMateriel;
