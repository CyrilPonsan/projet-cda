const { Client } = require("../../services/sequelize");

async function updateClient(clientId, client) {
  const updatedClient = await Client.update(client, {
    where: { id: clientId },
  });
  return updatedClient;
}

module.exports = updateClient;
