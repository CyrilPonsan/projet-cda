const createConseiller = require("../../models/conseiller.model/createConseiller");
const deleteConseiller = require("../../models/conseiller.model/deleteConseiller");
const getAllConseiller = require("../../models/conseiller.model/getAllConseiller");
const getConseillerDetail = require("../../models/conseiller.model/getConseillerDetail");
const { checkConseiller } = require("../../services/checkData");
const {
  serverIssue,
  regexNumber,
  badQuery,
  noData,
  regexGeneric,
} = require("../../utils/data");

async function httpGetAllConseiller(req, res) {
  try {
    const conseillers = await getAllConseiller();
    return res.status(200).json(conseillers);
  } catch (error) {
    return res.status(500).json({ message: serverIssue + error });
  }
}

async function httpGetConseillerDetail(req, res) {
  const conseillerId = req.params.id;
  if (!conseillerId || !regexNumber.test(conseillerId)) {
    return res.status(400).json({ message: badQuery });
  }
  try {
    const conseiller = await getConseillerDetail(conseillerId);
    if (!conseiller) {
      return res.status(404).json({ message: noData });
    }
    return res.status(200).json(conseiller);
  } catch (error) {
    return res.status(500).json({ message: serverIssue + error });
  }
}

async function httpDeleteConseiller(req, res) {
  const conseillerId = req.params.conseillerId;
  if (!conseillerId || !regexNumber.test(conseillerId)) {
    return res.status(400).json({ message: badQuery });
  }
  try {
    const deletedConseiller = await deleteConseiller(conseillerId);
    console.log("deletedConseiller", deletedConseiller);
    if (!deletedConseiller) {
      return res.status(404).json({ message: noData });
    }
    return res.status(200).json({
      message: `Le conseiller avec l'identifiant n°: ${conseillerId} a été supprimé avec succès.`,
      result: deletedConseiller,
    });
  } catch (error) {
    return res.status(500).json({ message: serverIssue + error });
  }
}

async function httpCreateConseiller(req, res) {
  console.log(req.body);
  if (checkConseiller(req.body)) {
    return res.status(400).json({ message: badQuery });
  }
  let result = true;
  req.body.roles.forEach((role) => {
    if (!regexGeneric.test(role)) {
      result = false;
    }
  });
  if (!result) {
    return res.status(400).json({ message: badQuery });
  }
  try {
    const conseiller = await createConseiller(req.body);
    if (!conseiller) {
      return res.status(404).json({ message: "Email non disponible." });
    }
    return res.status(201).json(conseiller);
  } catch (error) {
    return res.status(500).json({ message: serverIssue + error });
  }
}

module.exports = {
  httpGetAllConseiller,
  httpGetConseillerDetail,
  httpDeleteConseiller,
  httpCreateConseiller,
};
