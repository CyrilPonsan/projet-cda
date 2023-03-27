const express = require("express");
const {
  httpGetAllConseiller,
  httpGetConseillerDetail,
  httpDeleteConseiller,
  httpCreateConseiller,
} = require("./conseillers.controller");

const conseillerRouter = express.Router();

conseillerRouter.get("/", httpGetAllConseiller);
conseillerRouter.get("/:id", httpGetConseillerDetail);
conseillerRouter.delete("/:conseillerId", httpDeleteConseiller);
conseillerRouter.post("/", httpCreateConseiller);

module.exports = conseillerRouter;
