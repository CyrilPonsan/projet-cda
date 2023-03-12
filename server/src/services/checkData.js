const { regexMail, regexGeneric, regexNumber } = require("../utils/data");

function checkClient(data) {
  const { nom, email, contrat, telephone, adresse, codePostal, ville } = data;
  return (
    !nom ||
    !regexGeneric.test(nom) ||
    !email ||
    !regexMail.test(email) ||
    !contrat ||
    !regexGeneric.test(contrat) ||
    !telephone ||
    !regexGeneric.test(telephone) ||
    !adresse ||
    !regexGeneric.test(adresse) ||
    !codePostal ||
    !regexGeneric.test(codePostal) ||
    !ville ||
    !regexGeneric.test(ville)
  );
}

function checkMateriel(data) {
  const { miseEnService, ref, typeMaterielId, marqueId, modeleId, clientId } =
    data;

  return (
    !miseEnService ||
    !regexGeneric.test(miseEnService) ||
    (ref && !regexNumber.test(ref)) ||
    (clientId && !regexNumber.test(clientId)) ||
    !typeMaterielId ||
    !regexNumber.test(typeMaterielId) ||
    !marqueId ||
    !regexNumber.test(marqueId) ||
    !modeleId ||
    !regexNumber.test(modeleId)
  );
}

function checkKnowledgeGPT(data) {
  const { def, type, marque, modele } = data;

  return (
    !def ||
    !regexGeneric.test(def) ||
    !type ||
    !regexGeneric.test(type) ||
    !marque ||
    !regexGeneric.test(marque) ||
    !modele ||
    !regexGeneric.test(modele)
  );
}

module.exports = { checkClient, checkMateriel, checkKnowledgeGPT };
