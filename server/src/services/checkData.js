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

function checkTicket(data) {
  const { materielId, titre, resume, clientId } = data;

  return (
    !materielId ||
    !regexNumber.test(materielId) ||
    !titre ||
    !regexGeneric.test(titre) ||
    !resume ||
    !regexGeneric.test(resume) ||
    !clientId ||
    !regexNumber.test(clientId)
  );
}

function checkIntervention(data) {
  const { titre, statut, description, reponse, lieuIntervention } = data;

  return (
    !titre ||
    !regexGeneric.test(titre) ||
    !statut ||
    !regexNumber.test(statut) ||
    !description ||
    !regexGeneric.test(description) ||
    !reponse ||
    !regexGeneric.test(reponse) ||
    !lieuIntervention ||
    !regexGeneric.test(lieuIntervention)
  );
}

module.exports = {
  checkClient,
  checkMateriel,
  checkKnowledgeGPT,
  checkTicket,
  checkIntervention,
};
