const deleteClient = require("../../models/client.model/deleteClient");
const {
  getAllClients,
  getTotalClients,
} = require("../../models/client.model/getAllClients");
const {
  getClientByContrat,
  getClientByNom,
} = require("../../models/client.model/getClientDetails");
const getClientTickets = require("../../models/client.model/getClientTickets");
const updateClient = require("../../models/client.model/updateClient");
const { checkClient } = require("../../services/checkData");
const { getPagination } = require("../../services/queryService");
const {
  regexGeneric,
  regexNumber,
  badQuery,
  serverIssue,
  noData,
} = require("../../utils/data");
const {
  getRaisonsSociales,
  addRaisonSociale,
} = require("../../models/client.model/raisonSociale");
const createClient = require("../../models/client.model/createClient");
const getClientMateriels = require("../../models/client.model/getClientMateriels");
const { countMateriels } = require("../../services/countMateriels");

async function httpGetAllClients(req, res) {
  const { page, lmt } = req.query;
  if (!page || !regexNumber.test(page) || !lmt || !regexNumber.test(lmt)) {
    return res.status(400).json({ message: badQuery });
  }
  try {
    console.log(req.query);
    const clients = await getAllClients(getPagination(+page, +lmt), +lmt);
    const total = await getTotalClients();
    if (!clients) {
      return res.status(404).json({ message: "La liste de clients est vide." });
    }
    return res.status(200).json({ data: clients, total: total });
  } catch (err) {
    return res.status(500).json({ message: serverIssue + err });
  }
}

async function httpSearchClient(req, res) {
  const type = req.query.type;
  const value = req.query.value;
  if (
    !type ||
    !regexGeneric.test(type) ||
    !value ||
    !regexGeneric.test(value)
  ) {
    return res.status(400).json({ message: badQuery });
  }
  try {
    console.log("hello", type, value);
    let clients;
    switch (type) {
      case "contrat":
        clients = await getClientByContrat(value);
        break;
      case "nom":
        clients = await getClientByNom(value);
        break;
      default:
        console.log("coucou");
        return res.status(400).json({ message: badQuery });
        break;
    }
    if (!clients) {
      return res.status(404).json({ message: noData });
    }
    console.log(clients);
    return res.status(200).json(clients);
  } catch (err) {
    return res.status(500).json({ message: serverIssue + err });
  }
}

async function httpGetClientTickets(req, res) {
  const clientId = req.params.id;
  if (!clientId || !regexNumber.test(clientId)) {
    return res.status(400).json({ message: badQuery });
  }
  try {
    const tickets = await getClientTickets(clientId);
    if (!tickets) {
      return res.status(404).json({ message: noData });
    }
    const result = tickets.map((item) => ({
      id: item.id,
      resume: item.resume,
      titre: item.titre,
      ref: item.ref,
      date: item.intervention[0].date,
      statut: item.intervention[0].statut.label,
      typeMateriel: item.materiel.typeMateriel.type,
    }));
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: serverIssue + err });
  }
}

async function httpDeleteClient(req, res) {
  const clientId = req.params.id;
  if (!clientId || !regexNumber.test(clientId)) {
    return res.status(400).json({ message: badQuery });
  }
  try {
    await deleteClient(clientId);
    return res.status(200).json({
      message: `Le client avec l'identifiant: ${clientId} a ??t?? supprim?? de la bddd.`,
    });
  } catch (err) {
    return res.status(500).json({ message: serverIssue + err });
  }
}

async function httpUpdateClient(req, res) {
  const clientId = req.params.id;
  const clientToUpdate = req.body.client;
  console.log(req.body);
  if (checkClient(clientToUpdate) || !clientId || !regexNumber.test(clientId)) {
    return res.status(400).json({ message: badQuery });
  }
  try {
    const updatedClient = await updateClient(clientId, clientToUpdate);
    if (!updatedClient) {
      return res.status(404).json({ message: noData });
    }
    return res.status(201).json({
      message: `Le client avec l'identifiant: ${clientId} a ??t?? mis ?? jour avec succ??s.`,
    });
  } catch (err) {
    return res.status(500).json({ message: serverIssue + err });
  }
}

async function httpCreateClient(req, res) {
  const clientToAdd = req.body.client;
  const raisonSocialeId = clientToAdd.raisonSocialeId;
  console.log(clientToAdd);
  if (checkClient(clientToAdd)) {
    return res.status(400).json({ message: badQuery });
  }
  if (!raisonSocialeId || !regexNumber.test(raisonSocialeId)) {
    return res.status(400).json({ message: badQuery });
  }
  try {
    clientToAdd.raisonSocialeId = parseInt(raisonSocialeId);
    const addedClient = await createClient(clientToAdd);
    return res
      .status(201)
      .json({ message: "Client ajout?? avec succ??s.", data: addedClient });
  } catch (err) {
    return res.status(500).json({ message: serverIssue + err });
  }
}

async function httpGetRaisonsScociales(req, res) {
  try {
    const raisonsSociales = await getRaisonsSociales();
    const message =
      raisonsSociales.length === 0
        ? "Liste vide"
        : "Raisons sociales r??cup??r??es";
    return res.status(200).json({ message, data: raisonsSociales });
  } catch (err) {
    return res.status(500).json({ message: serverIssue + err });
  }
}

async function httpAddRaisonSociale(req, res) {
  const { raisonSociale } = req.body;
  if (!raisonSociale || !regexGeneric.test(raisonSociale)) {
    return res.status(400).json({ message: badQuery });
  }
  try {
    const newRaisonSociale = await addRaisonSociale(req.body);
    if (!newRaisonSociale) {
      return res
        .status(418)
        .json({ message: `Le nom ${raisonSociale} existe d??j??.` });
    }
    return res.status(201).json({
      message: "Raison sociale ajout??e avec succ??s.",
      newRaisonSociale,
    });
  } catch (err) {
    return res.status(500).json({ message: serverIssue + err });
  }
}

async function httpGetClientMateriels(req, res) {
  const clientId = req.params.clientId;
  if (!clientId || isNaN(clientId)) {
    return res.status(403).json({ message: badQuery });
  }
  try {
    const materiels = await getClientMateriels(+clientId);
    if (!materiels) {
      return res.status(404).json({ message: noData });
    }
    return res.status(200).json(countMateriels(materiels));
  } catch (err) {
    return res.status(500).json({ message: serverIssue + err });
  }
}

module.exports = {
  httpSearchClient,
  httpGetAllClients,
  httpGetClientTickets,
  httpDeleteClient,
  httpUpdateClient,
  httpGetRaisonsScociales,
  httpAddRaisonSociale,
  httpCreateClient,
  httpGetClientMateriels,
};
