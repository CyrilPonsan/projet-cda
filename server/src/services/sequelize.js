const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const { Sequelize, DataTypes } = require("sequelize");
const ConseillerModel = require("../models/sequelize.models.js/conseiller.db.model");
const ClientModel = require("../models/sequelize.models.js/client.db.model");
const TicketModel = require("../models/sequelize.models.js/ticket.db.model");
const MaterielModel = require("../models/sequelize.models.js/materiel.db.model");
const StatutModel = require("../models/sequelize.models.js/statut.model");
const InterventionModel = require("../models/sequelize.models.js/intervention.db.model");
const RaisonSocialeModel = require("../models/sequelize.models.js/raisonSociale.db.model");
const ModeleModel = require("../models/sequelize.models.js/modele.db.model");
const MarqueModel = require("../models/sequelize.models.js/marque.db.model");
const TypeMaterielModel = require("../models/sequelize.models.js/typeMateriel.db.model");
const HistoriqueModel = require("../models/sequelize.models.js/historique.db.model");

//  paramètres de connexion à la bdd

let sequelize;

if (process.env.NODE_ENV === "development") {
  console.log("dev environment");
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      define: { freezeTableName: true },
      host: process.env.DB_HOST,
      dialect: "mariadb",
      dialectOptions: {
        socketPath: "/var/run/mysqld/mysqld.sock",
      },
      logging: false,
    }
  );
} else {
  console.log("prod environment");
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      define: { freezeTableName: true },
      host: process.env.DB_HOST,
      dialect: "mariadb",
      dialectOptions: {
        socketPath: "/var/run/mysqld/mysqld.sock",
      },
      logging: false,
    }
  );
}

//  entités de la bdd

const Conseiller = ConseillerModel(sequelize, DataTypes);
const Client = ClientModel(sequelize, DataTypes);
const Ticket = TicketModel(sequelize, DataTypes);
const Materiel = MaterielModel(sequelize, DataTypes);
const Statut = StatutModel(sequelize, DataTypes);
const Intervention = InterventionModel(sequelize, DataTypes);
const RaisonSociale = RaisonSocialeModel(sequelize, DataTypes);
const Modele = ModeleModel(sequelize, DataTypes);
const Marque = MarqueModel(sequelize, DataTypes);
const TypeMateriel = TypeMaterielModel(sequelize, DataTypes);
const Historique = HistoriqueModel(sequelize, DataTypes);

//  relations

/**
 * relation ManyToOne entre ticket et intervention
 * un ticket peut avoir plusieurs interventions et
 * une intervention ne peut être associée qu'à un
 * seul ticket
 */
Ticket.hasMany(Intervention, {
  as: "intervention",
  allowNull: false,
  onDelete: "CASCADE",
});
Intervention.belongsTo(Ticket, { as: "ticket" });

/**
 * relation ManyToOne entre materiel et ticket
 * un materiel peut avoir plusieurs tickets
 * un ticket n'est rattaché qu'à un seul materiel
 */
Materiel.hasMany(Ticket, {
  as: "ticket",
  allowNull: false,
  onDelete: "CASCADE",
});
Ticket.belongsTo(Materiel, { as: "materiel" });

Client.hasMany(Ticket, { as: "ticket", allowNull: false, onDelete: "CASCADE" });
Ticket.belongsTo(Client, { as: "client" });

/**
 * relation ManyToOne entre client et materiel
 * un client peut avoir plusieurs materiel
 * un materiel n'est rattaché qu'à un seul client
 */
Client.hasMany(Materiel, {
  as: "materiel",
  allowNull: false,
  onDelete: "CASCADE",
});
Materiel.belongsTo(Client, { as: "client" });

/**
 * relation ManyToOne entre Conseiller et intervention
 * un Conseiller peut avoir plusieurs interventions
 * une intervention n'est rattaché qu'à un seul client
 */
Conseiller.hasMany(Intervention, { as: "intervention", allowNull: false });
Intervention.belongsTo(Conseiller, { as: "conseiller" });

/**
 * relation OneToOne entre statut et intervention
 */
Intervention.belongsTo(Statut, { as: "statut", allowNull: false });

RaisonSociale.hasMany(Client, { as: "client", allowNull: false });
Client.belongsTo(RaisonSociale);

TypeMateriel.hasMany(Materiel, { as: "materiel", allowNull: false });
Materiel.belongsTo(TypeMateriel, { as: "typeMateriel" });

Marque.hasMany(Materiel, { as: "materiel", allowNull: false });
Materiel.belongsTo(Marque, { as: "marque" });

Modele.hasMany(Materiel, { as: "materiel", allowNull: false });
Materiel.belongsTo(Modele, { as: "modele" });

//  triggers
Conseiller.addHook("afterCreate", async (conseiller) => {
  await Historique.create({
    message: `un nouveau conseiller a été créé le ${conseiller.createdAt}`,
    categorie: "conseiller",
  });
});

Ticket.addHook("afterCreate", async (ticket) => {
  await Historique.create({
    message: `un nouveau ticket n° ${ticket.ref} a été créé`,
    categorie: "ticket",
  });
});

//  initialisation de la bdd

function initDB() {
  return sequelize
    .sync({ alt: true })
    .then(() => console.log("Base de données initialisée."))
    .catch((error) =>
      console.log(`La base de données n'a pas été initialisée: ${error}`)
    );
}

//  reset bdd, utiliser le script "resetDB.js" pour remplir la table "statut"

function resetDB() {
  return sequelize
    .sync({ force: true })
    .then(() => console.log("Base de données réinitialisée."))
    .catch((error) =>
      console.log(`La base de données n'a pas été réinitialisée: ${error}`)
    );
}

module.exports = {
  initDB,
  resetDB,
  Conseiller,
  Client,
  Intervention,
  Materiel,
  Ticket,
  Statut,
  sequelize,
  RaisonSociale,
  TypeMateriel,
  Marque,
  Modele,
  Historique,
};
