const historiqueModel = require("./historique.db.model");

function ticketModel(sequelize, DataTypes) {
  return sequelize.define(
    "ticket",
    {
      ref: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      titre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      resume: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false },
    {
      hooks: {
        afterCreate: async function (ticket, options) {
          await historiqueModel.create(
            {
              message: `Un nouveau ticket ${ticket.ref} a été créé`,
            },
            { transaction: options.transaction }
          );
        },
      },
    }
  );
}

module.exports = ticketModel;
