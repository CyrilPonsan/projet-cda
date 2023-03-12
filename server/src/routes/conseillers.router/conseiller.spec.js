const request = require("supertest");
const app = require("../../app");
const session = require("supertest-session");

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
      await authenticatedSession
        .get("/v1/conseillers?page=1&limit=5")
        .expect(200);
    });
  });
  // retourne la liste de tous les conseillers en utilisant des données non conformes
  describe("Test GET /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .get("/v1/conseillers?page=toto&limit=5")
        .expect(400);
    });
  });
  // retourne la liste de tous les conseillers en utilisant des données non conformes
  describe("Test GET /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .get("/v1/conseillers?page=1&limit=bar")
        .expect(400);
    });
  });
  // retourne la liste de tous les conseillers en utilisant des données non conformes
  describe("Test GET /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .get("/v1/conseillers?page=foo&limit=bar")
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
  });
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
});
