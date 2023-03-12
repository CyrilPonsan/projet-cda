const request = require("supertest");
const app = require("../../app");
const session = require("supertest-session");
const { _setRandomNumber } = require("../../utils/data");
const { Materiel } = require("../../services/sequelize");

describe("API", () => {
  let authenticatedSession;
  let testSession = session(app);
  beforeEach(function (done) {
    testSession
      .post("/v1/auth")
      .send({ username: "admin@atelier.eco", password: "Abcd@1234" })
      .end(function (err) {
        if (err) return done(err);
        authenticatedSession = testSession;
        return done();
      });
  });
  // retourne la liste de tous les maériels d'un client
  describe("Test GET /client", () => {
    test("réponse attendue : 200", async () => {
      await authenticatedSession
        .get("/v1/materiel/client?page=1&limite=5&id=1")
        .expect(200);
    });
  });
  // retourne la liste de tous les maériels d'un client en utiilisant des données non conformes
  describe("Test GET /client", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .get("/v1/materiel/client?toto=1&limite=5&id=1")
        .expect(400);
    });
  });
  // retourne la liste de tous les maériels d'un client en utiilisant des données non conformes
  describe("Test GET /client", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .get("/v1/materiel/client?page=toto&limite=5&id=1")
        .expect(400);
    });
  });
  // retourne la liste de tous les maériels d'un client en utiilisant des données non conformes
  describe("Test GET /client", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .get("/v1/materiel/client?page=1&limite=toto&id=1")
        .expect(400);
    });
  });
  // retourne la liste de tous les maériels d'un client en utiilisant des données non conformes
  describe("Test GET /client", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .get("/v1/materiel/client?page=1&limite=5&toto=1")
        .expect(400);
    });
  });
  // retourne la liste de tous les maériels d'un client en utiilisant des données non conformes
  describe("Test GET /client", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .get("/v1/materiel/client?page=1&limite=5&id=toto")
        .expect(400);
    });
  });
  // retourne la liste de tous les maériels d'un client en utiilisant une id qui n'existe pas
  describe("Test GET /client", () => {
    test("réponse attendue : 404", async () => {
      await authenticatedSession
        .get("/v1/materiel/client?page=1&limite=5&id=1000000")
        .expect(404);
    });
  });
  // enregistre un nouveau matériel dans la bdd
  describe("Test POST /", () => {
    test("réponse attendue : 201", async () => {
      await authenticatedSession.post("/v1/materiel/").expect(201).send({
        miseEnService: "2023-02-23T08:06:39.000Z",
        clientId: 1,
        typeMaterielId: 1,
        marqueId: 2,
        modeleId: 1,
      });
    });
  });
  // enregistre un nouveau matériel dans la bdd avec des données non conformes
  describe("Test POST /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.post("/v1/materiel/").expect(400).send({
        miseEnService: "<hacked>2023-02-23T08:06:39.000Z",
        clientId: 1,
        typeMaterielId: 1,
        marqueId: 2,
        modeleId: 1,
      });
    });
  });
  // enregistre un nouveau matériel dans la bdd avec des données non conformes
  describe("Test POST /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.post("/v1/materiel/").expect(400).send({
        miseEnService: "2023-02-23T08:06:39.000Z",
        clientId: "<hacked>",
        typeMaterielId: 1,
        marqueId: 2,
        modeleId: 1,
      });
    });
  });
  // enregistre un nouveau matériel dans la bdd avec des données non conformes
  describe("Test POST /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.post("/v1/materiel/").expect(400).send({
        miseEnService: "2023-02-23T08:06:39.000Z",
        clientId: 1,
        typeMaterielId: "<hacked>",
        marqueId: 2,
        modeleId: 1,
      });
    });
  });
  // enregistre un nouveau matériel dans la bdd avec des données non conformes
  describe("Test POST /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.post("/v1/materiel/").expect(400).send({
        miseEnService: "2023-02-23T08:06:39.000Z",
        clientId: 1,
        typeMaterielId: 1,
        marqueId: "<hacked>",
        modeleId: 1,
      });
    });
  });
  // enregistre un nouveau matériel dans la bdd avec des données non conformes
  describe("Test POST /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.post("/v1/materiel/").expect(400).send({
        miseEnService: "2023-02-23T08:06:39.000Z",
        clientId: 1,
        typeMaterielId: 1,
        marqueId: 2,
        modeleId: "<hacked>",
      });
    });
  });
  // enregistre un nouveau matériel dans la bdd avec des données non conformes
  describe("Test POST /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.post("/v1/materiel/").expect(400).send({
        miseEnService: "<hacked>2023-02-23T08:06:39.000Z",
        clientId: "<hacked>",
        typeMaterielId: "<hacked>",
        marqueId: "<hacked>",
        modeleId: "<hacked>",
      });
    });
  });
  // enregistre un nouveau matériel dans la bdd avec une id client qui n'existe pas
  describe("Test POST /", () => {
    test("réponse attendue : 404", async () => {
      await authenticatedSession.post("/v1/materiel/").expect(404).send({
        miseEnService: "2023-02-23T08:06:39.000Z",
        clientId: 1000000,
        typeMaterielId: 1,
        marqueId: 2,
        modeleId: 1,
      });
    });
  });
  // met à jour un matériel pour un client donné
  describe("Test PUT /:ref", () => {
    test("réponse attendue : 201", async () => {
      await authenticatedSession.put("/v1/materiel/1").expect(201).send({
        miseEnService: "2023-02-23T08:06:39.000Z",
        clientId: 1,
        typeMaterielId: 2,
        marqueId: 2,
        modeleId: 2,
      });
    });
  });
  // met à jour un matériel pour un client donné avec des données non conformes
  describe("Test PUT /:ref", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.put("/v1/materiel/1").expect(400).send({
        miseEnService: "<hacked>2023-02-23T08:06:39.000Z",
        clientId: 1,
        typeMaterielId: 2,
        marqueId: 2,
        modeleId: 2,
      });
    });
  });
  // met à jour un matériel pour un client donné avec des données non conformes
  describe("Test PUT /:ref", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.put("/v1/materiel/1").expect(400).send({
        miseEnService: "2023-02-23T08:06:39.000Z",
        clientId: "<hacked>",
        typeMaterielId: 2,
        marqueId: 2,
        modeleId: 2,
      });
    });
  });
  // met à jour un matériel pour un client donné avec des données non conformes
  describe("Test PUT /:ref", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.put("/v1/materiel/1").expect(400).send({
        miseEnService: "2023-02-23T08:06:39.000Z",
        clientId: 1,
        typeMaterielId: "<hacked>",
        marqueId: 2,
        modeleId: 2,
      });
    });
  });
  // met à jour un matériel pour un client donné avec des données non conformes
  describe("Test PUT /:ref", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.put("/v1/materiel/1").expect(400).send({
        miseEnService: "2023-02-23T08:06:39.000Z",
        clientId: 1,
        typeMaterielId: 1,
        marqueId: "<hacked>",
        modeleId: 2,
      });
    });
  });
  // met à jour un matériel pour un client donné avec des données non conformes
  describe("Test PUT /:ref", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.put("/v1/materiel/1").expect(400).send({
        miseEnService: "2023-02-23T08:06:39.000Z",
        clientId: 1,
        typeMaterielId: 1,
        marqueId: 1,
        modeleId: "<hacked>",
      });
    });
  });
  // met à jour un matériel pour un client donné avec des données non conformes
  describe("Test PUT /:ref", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.put("/v1/materiel/1").expect(400).send({
        miseEnService: "<hacked>2023-02-23T08:06:39.000Z",
        clientId: "<hacked>",
        typeMaterielId: "<hacked>",
        marqueId: "<hacked>",
        modeleId: "<hacked>",
      });
    });
  });
  // met à jour un matériel pour un client donné avec une id client non conforme
  describe("Test PUT /:ref", () => {
    test("réponse attendue : 404", async () => {
      await authenticatedSession.put("/v1/materiel/toto").expect(400).send({
        miseEnService: "2023-02-23T08:06:39.000Z",
        clientId: 1,
        typeMaterielId: 2,
        marqueId: 2,
        modeleId: 2,
      });
    });
  });
  // met à jour un matériel pour un client donné avec une id client qui n'existe pas
  describe("Test PUT /:ref", () => {
    test("réponse attendue : 404", async () => {
      await authenticatedSession.put("/v1/materiel/1000000").expect(404).send({
        miseEnService: "2023-02-23T08:06:39.000Z",
        clientId: 1,
        typeMaterielId: 2,
        marqueId: 2,
        modeleId: 2,
      });
    });
  });
  // retourne la liste des types de matériel
  describe("Test GET /type-materiel", () => {
    test("réponse attendue : 200", async () => {
      await authenticatedSession.get("/v1/materiel/type-materiel").expect(200);
    });
  });
  // enregistre un nouveau type de matériel
  describe("Test POST /type-materiel", () => {
    test("réponse attendue : 201", async () => {
      await authenticatedSession
        .post("/v1/materiel/type-materiel")
        .expect(201)
        .send({
          type: "souris" + _setRandomNumber(10000, 1000000),
        });
    });
  });
  // enregistre un nouveau type de matériel avec des données non conformes
  describe("Test POST /type-materiel", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .post("/v1/materiel/type-materiel")
        .expect(400)
        .send({
          type: "<hacked>",
        });
    });
  });
  // enregistre un nouveau type de matériel avec des données déja existentes
  describe("Test POST /type-materiel", () => {
    test("réponse attendue : 404", async () => {
      await authenticatedSession
        .post("/v1/materiel/type-materiel")
        .expect(404)
        .send({
          type: "imprimante",
        });
    });
  });
  // retourne la liste des marques
  describe("Test GET /marque", () => {
    test("réponse attendue : 200", async () => {
      await authenticatedSession.get("/v1/materiel/marque").expect(200);
    });
  });
  // retourne la liste des modèles de matériel
  describe("Test GET /modele", () => {
    test("réponse attendue : 200", async () => {
      await authenticatedSession.get("/v1/materiel/modele").expect(200);
    });
  });
  // les détails d'un matériel
  describe("Test GET /:ref", () => {
    test("réponse attendue : 200", async () => {
      const ref = await _getLastMaterielRef();
      await authenticatedSession.get(`/v1/materiel/${ref}`).expect(200);
    });
  });
  // les détails d'un matériel avec une id non conforme
  describe("Test GET /:ref", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.get("/v1/materiel/foo").expect(400);
    });
  });
  // les détails d'un matériel avec une id qui n'existe pas
  describe("Test GET /:ref", () => {
    test("réponse attendue : 404", async () => {
      await authenticatedSession.get("/v1/materiel/100000").expect(404);
    });
  });
  // supprime un matériel
  describe("Test delete /:ref", () => {
    test("réponse attendue : 201", async () => {
      const ref = await _getLastMaterielRef();
      await authenticatedSession.delete(`/v1/materiel/${ref}`).expect(201);
    });
  });
  // supprime un matériel avec une ref non conforme
  describe("Test delete /:ref", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.delete("/v1/materiel/foo").expect(400);
    });
  });
  // supprime un matériel avec une ref qui n'existe pas
  describe("Test delete /:ref", () => {
    test("réponse attendue : 404", async () => {
      await authenticatedSession.delete("/v1/materiel/1000000").expect(404);
    });
  });
});

async function _getLastMaterielRef() {
  const materiels = await Materiel.findAll({ order: [["id", "DESC"]] });
  return parseInt(materiels[0].ref);
}
