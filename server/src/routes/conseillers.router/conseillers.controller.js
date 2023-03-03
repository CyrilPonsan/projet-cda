const getAllConseiller = require("../../models/conseiller.model/getAllConseiller");
const getConseillerDetail = require("../../models/conseiller.model/getConseillerDetail");
const { getPagination } = require("../../services/queryService");
const {
  serverIssue,
  regexNumber,
  badQuery,
  noData,
} = require("../../utils/data");

async function httpGetAllConseiller(req, res) {
  const { page, limit } = req.query;
  if (!page || !regexNumber.test(page) || !limit || !regexNumber.test(limit)) {
    return res.status(400).json({ message: badQuery });
  }
  try {
    const conseillers = await getAllConseiller(
      getPagination(+page, +limit),
      +limit
    );
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

module.exports = { httpGetAllConseiller, httpGetConseillerDetail };
