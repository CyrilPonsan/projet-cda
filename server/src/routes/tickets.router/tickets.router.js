const express = require("express");
const { hasAccess } = require("../../middlewares/auth.middleware");
const {
  httpGetTickets,
  httpGetTicketDetails,
  httpGetTicketStatutsList,
  httpCreateIntervention,
  httpCreateTicket,
  httpGetClientTickets,
} = require("./tickets.controller");

const ticketsRouter = express.Router();

ticketsRouter.get("/", httpGetTickets);
ticketsRouter.get("/details/:ref", hasAccess, httpGetTicketDetails);
ticketsRouter.get("/statuts", httpGetTicketStatutsList);
ticketsRouter.post("/new-intervention", httpCreateIntervention);
ticketsRouter.post("/new-ticket", httpCreateTicket);
ticketsRouter.get("/client-tickets", httpGetClientTickets);

module.exports = ticketsRouter;
