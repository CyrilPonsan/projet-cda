const express = require("express");
const { isAdmin } = require("../../middlewares/auth.middleware");
const {
  httpGetAllConseiller,
  httpGetConseillerDetail,
  httpDeleteConseiller,
  httpCreateConseiller,
  httpUpdateConseiller,
} = require("./conseillers.controller");

const conseillerRouter = express.Router();

conseillerRouter.get("/", httpGetAllConseiller);
conseillerRouter.get("/:id", httpGetConseillerDetail);
conseillerRouter.delete("/:conseillerId", isAdmin, httpDeleteConseiller);
conseillerRouter.post("/", isAdmin, httpCreateConseiller);
conseillerRouter.put("/", isAdmin, httpUpdateConseiller);

module.exports = conseillerRouter;
