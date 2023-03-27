const {
  createNewIntervention,
} = require("../../models/ticket.model/createNewIntervention");
const createTicket = require("../../models/ticket.model/createTicket");
const getClientTicket = require("../../models/ticket.model/getClientTicket");
const {
  getTicketDetails,
} = require("../../models/ticket.model/getTicketDetails");
const {
  getTickets,
  getTotalTickets,
} = require("../../models/ticket.model/getTickets");
const {
  getTicketsStatutsList,
} = require("../../models/ticket.model/getTicketStatutsList");
const { checkTicket, checkIntervention } = require("../../services/checkData");
const { getPagination } = require("../../services/queryService");
const { testNewInterventionData } = require("../../services/ticketsService");
const {
  regexNumber,
  badQuery,
  serverIssue,
  noData,
  regexGeneric,
} = require("../../utils/data");

async function httpGetTickets(req, res) {
  const userId = req.session.userId;
  const page = req.query.page;
  const limit = req.query.lmt;

  if (
    !userId ||
    !regexNumber.test(userId) ||
    !page ||
    !regexNumber.test(page) ||
    !limit ||
    !regexNumber.test(limit)
  ) {
    return res.status(400).json({ message: badQuery });
  }

  try {
    let tickets = await getTickets(getPagination(+page, +limit), +limit);
    const total = await getTotalTickets();
    return res.status(200).json({
      message:
        tickets.length === 0 ? "liste vide" : "tickets récupérés avec succès",
      data: tickets,
      total: total,
    });
  } catch (err) {
    return res.status(500).json({ message: serverIssue + err });
  }
}

async function httpGetTicketDetails(req, res) {
  const ticketRef = req.params.ref;

  if (!ticketRef || !regexNumber.test(ticketRef)) {
    return res.status(400).json({ message: badQuery });
  }

  try {
    const ticketDetails = await getTicketDetails(ticketRef);

    if (!ticketDetails) {
      return res.status(404).json({ message: noData });
    }

    return res.status(200).json(ticketDetails);
  } catch (error) {
    return res.status(500).json({ message: serverIssue });
  }
}

async function httpGetTicketStatutsList(req, res) {
  try {
    const statuts = await getTicketsStatutsList();
    return res.status(200).json({ data: statuts });
  } catch (error) {
    return res.status(500).json({ message: serverIssue });
  }
}

async function httpCreateIntervention(req, res) {
  const userId = req.session.userId;
  const { titre, ticketId, statut, lieuIntervention, description, reponse } =
    req.body.item;

  console.log("item", req.body.item);
  console.log(titre, ticketId, statut, description, reponse);
  if (checkIntervention(req.body.item)) {
    return res.status(400).json({ message: badQuery });
  }

  if (+statut === 5 && !req.auth.roles.includes("admin")) {
    return res.status(418).json({
      error: "Votre rôle ne vous permet pas d'effectuer cette opération.",
    });
  }

  try {
    const newIntervention = await createNewIntervention(userId, req.body.item);
    if (!newIntervention) {
      throw new Error("Un problème est survenu...");
    }
    return res
      .status(201)
      .json({ message: "Nouvelle intervention créée avec succès." });
  } catch (error) {
    return res.status(500).json({ message: serverIssue + error });
  }
}

async function httpCreateTicket(req, res) {
  const ticket = req.body.ticket;
  if (checkTicket(ticket)) {
    return res.status(400).json({ message: badQuery });
  }

  const intervention = req.body.intervention;
  if (checkTicket(ticket)) {
    return res.status(400).json({ message: badQuery });
  }

  const userId = req.session.userId || 1;

  try {
    const newTicket = await createTicket(ticket, intervention, userId);
    if (!newTicket) {
      throw new Error("Serveur injoignable...");
    }
    return res
      .status(201)
      .json({ message: "Ticket créé avec succès", data: newTicket });
  } catch (error) {
    return res.status(500).json({ message: serverIssue + error });
  }
}

async function httpGetClientTickets(req, res) {
  try {
    const tickets = await getClientTicket(2);
    return res.status(200).json(tickets);
  } catch (error) {
    return res.status(500).json({ message: serverIssue + error });
  }
}

module.exports = {
  httpGetTickets,
  httpGetTicketDetails,
  httpGetTicketStatutsList,
  httpCreateIntervention,
  httpCreateTicket,
  httpGetClientTickets,
};
