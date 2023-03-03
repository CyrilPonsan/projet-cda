const express = require("express");
const {
  httpGetOneMateriel,
  httpDeleteMateriel,
  httpCreateMateriel,
  httpUpdateMateriel,
  httpGetClientMateriels,
  httpGetTypesList,
  httpGetMarqueList,
  httpGetModeleList,
  httpCreateTypeMateriel,
} = require("./materiel.controller");

const materielRouter = express.Router();

materielRouter.get("/client", httpGetClientMateriels);
materielRouter.post("/", httpCreateMateriel);
materielRouter.put("/:ref", httpUpdateMateriel);
materielRouter.get("/type-materiel", httpGetTypesList);
materielRouter.post("/type-materiel", httpCreateTypeMateriel);
materielRouter.get("/marque", httpGetMarqueList);
materielRouter.get("/modele", httpGetModeleList);
materielRouter.get("/:ref", httpGetOneMateriel);
materielRouter.delete("/:ref", httpDeleteMateriel);

module.exports = materielRouter;
