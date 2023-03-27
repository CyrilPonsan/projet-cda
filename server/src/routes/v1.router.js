const express = require("express");
const { hasAccess } = require("../middlewares/auth.middleware");
const authRouter = require("./auth.router/auth.router");
const clientsRouter = require("./clients.router/clients.router");
const conseillerRouter = require("./conseillers.router/conseillers..router");
const knowledgeRouter = require("./knowledge/knowledge.router");
const materielRouter = require("./materiel.router/materiel.router");
const ticketsRouter = require("./tickets.router/tickets.router");

const api = express.Router();

api.use("/auth", authRouter);
api.use("/clients", hasAccess, clientsRouter);
api.use("/tickets", ticketsRouter);
api.use("/materiel", materielRouter);
api.use("/knowledge", hasAccess, knowledgeRouter);
api.use("/conseillers", conseillerRouter);

module.exports = api;
