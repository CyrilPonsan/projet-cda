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
    { timestamps: false }
    /* {
      hooks: {
        afterCreate: function (ticket) {
          historiqueModel.create({
            message: "Un nouveau ticket",
          });
        },
      },
    } */
  );
}

module.exports = ticketModel;
