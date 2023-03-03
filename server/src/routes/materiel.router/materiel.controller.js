const createMateriel = require("../../models/materiel.model.js/createMateriel");
const deleteMateriel = require("../../models/materiel.model.js/deleteMateriel");
const getClientMateriels = require("../../models/materiel.model.js/getClientMateriels");
const getOneMateriel = require("../../models/materiel.model.js/getOneMateriel");
const { getMarqueList } = require("../../models/materiel.model.js/marque");
const { getModeleList } = require("../../models/materiel.model.js/modele");
const {
  getTypeMaterielList,
} = require("../../models/materiel.model.js/typeMateriel");
const updateMateriel = require("../../models/materiel.model.js/updateMateriel");
const { checkMateriel } = require("../../services/checkData");
const { getPagination } = require("../../services/queryService");
const {
  regexNumber,
  badQuery,
  noData,
  serverIssue,
} = require("../../utils/data");

async function httpGetOneMateriel(req, res) {
  const ref = req.params.ref;
  if (!ref || !regexNumber.test(ref)) {
    return res.status(400).json({ message: badQuery });
  }
  try {
    const materiel = await getOneMateriel(ref);
    console.log("matos", materiel);
    if (!materiel) {
      return res.status(404).json({ message: noData });
    }
    return res.status(200).json({ materiel });
  } catch (error) {
    return res.status(500).json({ message: serverIssue });
  }
}

async function httpDeleteMateriel(req, res) {
  const ref = req.params.ref;
  if (!ref || !regexNumber.test(ref)) {
    return res.status(400).json({ message: badQuery });
  }
  try {
    const deletedMateriel = await deleteMateriel(ref);
    if (!deletedMateriel) {
      return res.status(404).json({ message: noData });
    }
    return res.status(201).json({
      message: `Le matériel avec la référence: ${ref} a été supprimé de la bdd.`,
    });
  } catch (error) {
    return res.status(500).json({ message: serverIssue + error });
  }
}

async function httpCreateMateriel(req, res) {
  const materielToAdd = req.body;
  if (checkMateriel(materielToAdd)) {
    return res.status(400).json({ message: badQuery });
  }
  try {
    const newMateriel = await createMateriel(materielToAdd);
    if (newMateriel) {
      return res
        .status(201)
        .json({ message: "Nouveau matériel enregistré", newMateriel });
    }
  } catch (error) {
    return res.status(500).json({ message: serverIssue + error });
  }
}

async function httpUpdateMateriel(req, res) {
  const materielToUpdate = req.body;
  const materielId = req.params.ref;
  if (
    checkMateriel(materielToUpdate) ||
    !materielId ||
    !regexNumber.test(materielId)
  ) {
    return res.status(400).json({ message: badQuery });
  }
  try {
    const updatedMateriel = await updateMateriel(materielToUpdate, materielId);
    if (updatedMateriel) {
      return res.status(201).json({
        message: `Le matériel avec l'identifiant: ${materielId} a été mis à jour.`,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: serverIssue + error });
  }
}

async function httpGetClientMateriels(req, res) {
  const { page, limite, id } = req.query;
  if (
    !id ||
    !regexNumber.test(id) ||
    !page ||
    !regexNumber.test(page) ||
    !limite ||
    !regexNumber.test(limite)
  ) {
    return res.status(403).json({ message: badQuery });
  }
  try {
    const clientMateriels = await getClientMateriels(
      id,
      getPagination(+page, +limite),
      +limite
    );
    if (!clientMateriels) {
      return res.status(404).json({ message: noData });
    }
    return res.status(200).json(clientMateriels);
  } catch (error) {
    return res.status(500).json({ message: serverIssue + error });
  }
}

async function httpGetTypesList(req, res) {
  try {
    const typeMaterielList = await getTypeMaterielList();
    return res.status(200).json(typeMaterielList);
  } catch (error) {
    return res.status(500).json({ message: serverIssue + error });
  }
}

async function httpGetMarqueList(req, res) {
  try {
    const marqueList = await getMarqueList();
    return res.status(200).json(marqueList);
  } catch (error) {
    return res.status(500).json({ message: serverIssue + error });
  }
}

async function httpGetModeleList(req, res) {
  try {
    const modeleList = await getModeleList();
    return res.status(200).json(modeleList);
  } catch (error) {
    return res.status(500).json({ message: serverIssue + error });
  }
}

module.exports = {
  httpGetOneMateriel,
  httpDeleteMateriel,
  httpCreateMateriel,
  httpUpdateMateriel,
  httpGetClientMateriels,
  httpGetTypesList,
  httpGetMarqueList,
  httpGetModeleList,
};
