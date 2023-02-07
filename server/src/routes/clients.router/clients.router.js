const express = require("express");
const { hasAccess } = require("../../middlewares/auth.middleware");
const { httpSearchClient } = require("./clients.controller");

const clientsRouter = express.Router();

clientsRouter.get("/search", hasAccess, httpSearchClient);

module.exports = clientsRouter;
