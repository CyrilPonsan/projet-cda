const {
  getClientByContrat,
  getClientByNom,
} = require("../../models/client.model/getClientDetails");
const {
  regexGeneric,
  regexNumber,
  badQuery,
  serverIssue,
  noData,
} = require("../../utils/data");

async function httpSearchClient(req, res) {
  console.log("coucou");
  const type = req.query.type;
  const value = req.query.value;
  if (
    !type ||
    !regexGeneric.test(type) ||
    !value ||
    !regexGeneric.test(value)
  ) {
    return res.status(400).json({ message: badQuery });
  }
  try {
    let clients;
    switch (type) {
      case "contrat":
        clients = await getClientByContrat(+value);
        break;
      case "nom":
        clients = await getClientByNom(value);
        break;
      default:
        break;
    }
    if (!clients) {
      return res.status(404).json({ message: noData });
    }
    return res.status(200).json(clients);
  } catch (err) {
    return res.status(500).json({ message: serverIssue + err });
  }
}

module.exports = { httpSearchClient };
