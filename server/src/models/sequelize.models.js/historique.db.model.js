function historiqueModel(sequelize, DataTypes) {
  return sequelize.define("historique", {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
}

module.exports = historiqueModel;
