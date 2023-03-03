const { Client } = require("../../services/sequelize");

async function getClients() {
  return Client.findAll();
}

module.exports = getClients;
