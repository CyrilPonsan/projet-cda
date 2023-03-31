const { Client } = require("../../services/sequelize");

async function deleteClient(clientId) {
  const deletedClient = await Client.destroy({ where: { id: clientId } });
  return deletedClient;
}

module.exports = deleteClient;
