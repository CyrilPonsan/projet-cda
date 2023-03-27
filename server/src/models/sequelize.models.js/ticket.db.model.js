const { Historique } = require("../../services/sequelize");

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
        afterCreate: (ticket) => {
          Historique.create({
            message: `Un nouveau ticket ref : ${
              ticket.ref
            } vient d'être créé le ${new Date().toLocaleDateString()} `,
          });
        },
      },
    }
  );
}

module.exports = ticketModel;
