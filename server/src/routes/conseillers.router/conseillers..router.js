const express = require("express");
const {
  httpGetAllConseiller,
  httpGetConseillerDetail,
} = require("./conseillers.controller");

const conseillerRouter = express.Router();

conseillerRouter.get("/", httpGetAllConseiller);
conseillerRouter.get("/:id", httpGetConseillerDetail);

module.exports = conseillerRouter;
