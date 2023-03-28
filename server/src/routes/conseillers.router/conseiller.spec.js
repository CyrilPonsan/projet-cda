const request = require("supertest");
const app = require("../../app");
const session = require("supertest-session");
const { Conseiller } = require("../../services/sequelize");

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
  // retourne la liste de tous les conseillers
  describe("Test GET /", () => {
    test("réponse attendue : 200", async () => {
      await authenticatedSession.get("/v1/conseillers").expect(200);
    });
  });
  /*
  // retourne la liste de tous les conseillers en utilisant des données non conformes
  describe("Test GET /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.get("/v1/conseillers").expect(400);
    });
  });
  // retourne la liste de tous les conseillers en utilisant des données non conformes
  describe("Test GET /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .get("/v1/conseillers")
        .expect(400);
    });
  });
  // retourne la liste de tous les conseillers en utilisant des données non conformes
  describe("Test GET /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .get("/v1/conseillers")
        .expect(400);
    });
  });
  // retourne la liste de tous les conseillers en utilisant des données non conformes
  describe("Test GET /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .get("/v1/conseillers?foo=1&limit=5")
        .expect(400);
    });
  });
  // retourne la liste de tous les conseillers en utilisant des données non conformes
  describe("Test GET /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .get("/v1/conseillers?page=1&bar=5")
        .expect(400);
    });
  }); */
  // retourne les détails d'un conseiller
  describe("Test GET /:id", () => {
    test("réponse attendue : 200", async () => {
      await authenticatedSession.get("/v1/conseillers/1").expect(200);
    });
  });
  // retourne les détails d'un conseiller en utilisant des données non conformes
  describe("Test GET /:id", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.get("/v1/conseillers/foo").expect(400);
    });
  });
  // retourne les détails d'un conseiller en utilisant une id qui n'existe pas
  describe("Test GET /:id", () => {
    test("réponse attendue : 404", async () => {
      await authenticatedSession.get("/v1/conseillers/1000000").expect(404);
    });
  });
  //  supprime un conseiller de la base de données
  describe("Test DELETE /:conseillerId", () => {
    test("réponse attendue : 200", async () => {
      await authenticatedSession
        .delete(`/v1/conseillers/${await _getLastConseillerId()}`)
        .expect(200);
    });
  });
  //  supprime un conseiller de la base de données en utilisant un identifiant inexistant
  describe("Test DELETE /:conseillerId", () => {
    test("réponse attendue : 404", async () => {
      const id = (await _getLastConseillerId()) + 1;
      console.log("id", id);
      await authenticatedSession.delete(`/v1/conseillers/${id}`).expect(404);
    });
  });
  //  supprime un conseiller de la base de données en utilisant un identifiant non conforme
  describe("Test DELETE /:conseillerId", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.delete("/v1/conseillers/foo").expect(400);
    });
  });
  describe("Test POST /", () => {
    test("réponse attendue : 201", async () => {
      await authenticatedSession
        .post("/v1/conseillers")
        .expect(201)
        .send({
          username: "toto@toto.fr",
          password: "Abcd@1234",
          prenom: "jean",
          nom: "toto",
          roles: ["tech", "admin"],
        });
    });
  });
  describe("Test POST /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .post("/v1/conseillers")
        .expect(400)
        .send({
          username: "<hacked>",
          password: "Abcd@1234",
          prenom: "jean",
          nom: "toto",
          roles: ["tech", "admin"],
        });
    });
  });
});

async function _getLastConseillerId() {
  const conseillers = await Conseiller.findAll({ order: [["id", "DESC"]] });
  return parseInt(conseillers[0].id);
}
