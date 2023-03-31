const app = require("../../app");
const { Client, RaisonSociale } = require("../../services/sequelize");
const { _setRandomNumber } = require("../../utils/data");
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
  describe("Test GET /", () => {
    test("réponse attendue : 200", async () => {
      await authenticatedSession.get("/v1/clients?page=1&lmt=5").expect(200);
    });
  });
  // page non conforme
  describe("Test GET /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.get("/v1/clients?page=foo&lmt=5").expect(400);
    });
  });
  // lmt non conforme
  describe("Test GET /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.get("/v1/clients?page=1&lmt=bar").expect(400);
    });
  });
  // page et lmt non conformes
  describe("Test GET /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .get("/v1/clients?page=foo&lmt=bar")
        .expect(400);
    });
  });
  describe("Test GET /clients", () => {
    test("réponse attendue : 200", async () => {
      await authenticatedSession.get("/v1/clients/clients").expect(200);
    });
  });
  describe("Test GET /", () => {
    test("réponse attendue : 200", async () => {
      await authenticatedSession
        .get("/v1/clients/raisons-sociales")
        .expect(200);
    });
  });
  // update a client
  describe("Test PUT /:id", () => {
    test("réponse attendue : 201", async () => {
      await authenticatedSession
        .put("/v1/clients/1")
        .expect(201)
        .send({
          client: {
            nom: "Nouvelle entreprise",
            email: "contact_13@entreprise.com",
            contrat: "" + _setRandomNumber(10000, 100000),
            telephone: "0203040506",
            adresse: "13 rue Xavier Pinson",
            codePostal: "64000",
            ville: "San Francisco sur Adour",
          },
        });
    });
  });
  // update a client with non conform data
  describe("Test PUT /:id", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .put("/v1/clients/1")
        .expect(400)
        .send({
          client: {
            nom: "<hacked>Nouvelle entreprise<lol>",
            email: "contact_13@entreprise.com",
            contrat: "" + _setRandomNumber(10000, 100000),
            telephone: "0203040506",
            adresse: "13 rue Xavier Pinson",
            codePostal: "64000",
            ville: "San Francisco sur Adour",
          },
        });
    });
  });
  // update a client with non conform data
  describe("Test PUT /:id", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .put("/v1/clients/1")
        .expect(400)
        .send({
          client: {
            nom: "Nouvelle entreprise",
            email: "<hacked>contact_13@entreprise.com",
            contrat: "" + _setRandomNumber(10000, 100000),
            telephone: "0203040506",
            adresse: "13 rue Xavier Pinson",
            codePostal: "64000",
            ville: "San Francisco sur Adour",
          },
        });
    });
  });
  // update a client with non conform data
  describe("Test PUT /:id", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .put("/v1/clients/1")
        .expect(400)
        .send({
          client: {
            nom: "Nouvelle entreprise",
            email: "contact_13@entreprise.com",
            contrat: "<hacked>" + _setRandomNumber(10000, 100000),
            telephone: "0203040506",
            adresse: "13 rue Xavier Pinson",
            codePostal: "64000",
            ville: "San Francisco sur Adour",
          },
        });
    });
  });
  // update a client with non conform data
  describe("Test PUT /:id", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .put("/v1/clients/1")
        .expect(400)
        .send({
          client: {
            nom: "Nouvelle entreprise",
            email: "contact_13@entreprise.com",
            contrat: "" + _setRandomNumber(10000, 100000),
            telephone: "<hacked>0203040506",
            adresse: "13 rue Xavier Pinson",
            codePostal: "64000",
            ville: "San Francisco sur Adour",
          },
        });
    });
  });
  // update a client with non conform data
  describe("Test PUT /:id", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .put("/v1/clients/1")
        .expect(400)
        .send({
          client: {
            nom: "Nouvelle entreprise",
            email: "contact_13@entreprise.com",
            contrat: "" + _setRandomNumber(10000, 100000),
            telephone: "0203040506",
            adresse: "<hacked>13 rue Xavier Pinson",
            codePostal: "64000",
            ville: "San Francisco sur Adour",
          },
        });
    });
  });
  // update a client with non conform data
  describe("Test PUT /:id", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .put("/v1/clients/1")
        .expect(400)
        .send({
          client: {
            nom: "Nouvelle entreprise",
            email: "contact_13@entreprise.com",
            contrat: "" + _setRandomNumber(10000, 100000),
            telephone: "0203040506",
            adresse: "13 rue Xavier Pinson",
            codePostal: "<hacked>64000",
            ville: "San Francisco sur Adour",
          },
        });
    });
  });
  // update a client with non conform data
  describe("Test PUT /:id", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .put("/v1/clients/1")
        .expect(400)
        .send({
          client: {
            nom: "Nouvelle entreprise",
            email: "contact_13@entreprise.com",
            contrat: "" + _setRandomNumber(10000, 100000),
            telephone: "0203040506",
            adresse: "13 rue Xavier Pinson",
            codePostal: "64000",
            ville: "<hacked>San Francisco sur Adour",
          },
        });
    });
  });
  // update a client with non conform data
  describe("Test PUT /:id", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .put("/v1/clients/1")
        .expect(400)
        .send({
          client: {
            nom: "<hacked>Nouvelle entreprise",
            email: "<hacked>contact_13@entreprise.com",
            contrat: "<hacked>" + _setRandomNumber(10000, 100000),
            telephone: "<hacked>0203040506",
            adresse: "<hacked>13 rue Xavier Pinson",
            codePostal: "<hacked>64000",
            ville: "<hacked>San Francisco sur Adour",
          },
        });
    });
  });
  // update a client
  describe("Test PUT /:id", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .put("/v1/clients/foo")
        .expect(400)
        .send({
          client: {
            nom: "Nouvelle entreprise",
            email: "contact_13@entreprise.com",
            contrat: "" + _setRandomNumber(10000, 100000),
            telephone: "0203040506",
            adresse: "13 rue Xavier Pinson",
            codePostal: "64000",
            ville: "San Francisco sur Adour",
          },
        });
    });
  });
  // update a client
  describe("Test PUT /:id", () => {
    test("réponse attendue : 404", async () => {
      await authenticatedSession
        .put("/v1/clients/10000")
        .expect(404)
        .send({
          client: {
            nom: "Nouvelle entreprise",
            email: "contact_13@entreprise.com",
            contrat: "" + _setRandomNumber(10000, 100000),
            telephone: "0203040506",
            adresse: "13 rue Xavier Pinson",
            codePostal: "64000",
            ville: "San Francisco sur Adour",
          },
        });
    });
  });
  // search a client by contrat
  describe("Test GET /search", () => {
    test("réponse attendue : 200", async () => {
      await authenticatedSession
        .get("/v1/clients/search?type=contrat&value=1012")
        .expect(200);
    });
  });
  // search a client by contrat with non existing contrat number
  describe("Test GET /search", () => {
    test("réponse attendue : 404", async () => {
      await authenticatedSession
        .get("/v1/clients/search?type=contrat&value=1012000")
        .expect(404);
    });
  });
  // search a client by contrat with bad request
  describe("Test GET /search", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .get("/v1/clients/search?type=foo&value=1012")
        .expect(400);
    });
  });
  // search a client by contrat with bad request
  describe("Test GET /search", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .get("/v1/clients/search?type=contrat&value=<hacked>")
        .expect(400);
    });
  });
  // search a client by contrat with bad request
  describe("Test GET /search", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .get("/v1/clients/search?type=foo&value=<hacked>")
        .expect(400);
    });
  });
  // get tickets related to a client who has no ticket
  describe("Test GET /tickets/1000000", () => {
    test("réponse attendue : 404", async () => {
      await authenticatedSession.get("/v1/clients/tickets/10000").expect(404);
    });
  });
  // get tickets related to a client
  describe("Test GET /tickets/2", () => {
    test("réponse attendue : 200", async () => {
      await authenticatedSession.get("/v1/clients/tickets/2").expect(200);
    });
  });
  // get tickets related to a client with non conform id
  describe("Test GET /tickets/1", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.get("/v1/clients/tickets/foo").expect(400);
    });
  });
  // efface un client de la bdd
  describe("Test DELETE /:id", () => {
    test("réponse attendue : 200", async () => {
      const id = await _getLastClientId();
      await authenticatedSession.delete(`/v1/clients/${id}`).expect(200);
    });
  });
  // efface un client de la bdd avec une id non conforme
  describe("Test DELETE /:id", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.delete(`/v1/clients/toto`).expect(400);
    });
  });
  // efface un client de la bdd avec une id non existente
  describe("Test DELETE /:id", () => {
    test("réponse attendue : 404", async () => {
      await authenticatedSession.delete(`/v1/clients/50000`).expect(404);
    });
  });
  // enregistre une nouvelle raison sociale dans la bdd
  describe("Test POST /raisons-sociales", () => {
    test("réponse attendue : 200", async () => {
      await authenticatedSession
        .post("/v1/clients/raisons-sociales")
        .expect(201)
        .send({
          raisonSociale: "TEST",
        });
    });
  });
  // enregistre une nouvelle raison sociale dans la bdd avec un nom déjà présent dans la bdd
  describe("Test POST /raisons-sociales", () => {
    test("réponse attendue : 404", async () => {
      await authenticatedSession
        .post("/v1/clients/raisons-sociales")
        .expect(404)
        .send({
          raisonSociale: "TEST",
        });
    });
  });
  // enregistre une nouvelle raison sociale dans la bdd avec une id non conforme
  describe("Test POST /raisons-sociales", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .post("/v1/clients/raisons-sociales")
        .expect(400)
        .send({
          raisonSociale: "<hacked>",
        });
    });
  });
  // efface une raison sociale de la bdd
  describe("Test DELETE /raisons-sociales/:id", () => {
    test("réponse attendue : 200", async () => {
      const id = await _getLastRaisonSocialeId();
      await authenticatedSession
        .delete(`/v1/clients/raisons-sociales/${id}`)
        .expect(200);
    });
  });
  // efface une raison sociale de la bdd avec une id non existente
  describe("Test DELETE /raisons-sociales/:id", () => {
    test("réponse attendue : 404", async () => {
      await authenticatedSession
        .delete("/v1/clients/raisons-sociales/1000000")
        .expect(404);
    });
  });
  // efface une raison sociale de la bdd avec une id non conforme
  describe("Test DELETE /raisons-sociales/:id", () => {
    test("réponse attendue : 404", async () => {
      await authenticatedSession
        .delete("/v1/clients/raisons-sociales/1000000")
        .expect(404);
    });
  });
  // enregistre un nouveau client dans la bdd
  describe("Test POST /", () => {
    test("réponse attendue : 201", async () => {
      await authenticatedSession
        .post("/v1/clients/")
        .expect(201)
        .send({
          client: {
            nom: "Foo",
            email: _setRandomNumber(10000, 999999) + "@foo.bar",
            contrat: "" + _setRandomNumber(10000, 999999),
            telephone: "001",
            adresse: "1 rue Xavier Pinson",
            codePostal: "64000",
            ville: "Bar City",
            raisonSocialeId: 1,
          },
        });
    });
  });
  // enregistre un nouveau client dans la bdd avec une raison sociale non conforme
  describe("Test POST /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .post("/v1/clients/")
        .expect(400)
        .send({
          client: {
            nom: "Foo",
            email: _setRandomNumber(10000, 999999) + "@foo.bar",
            contrat: "" + _setRandomNumber(10000, 999999),
            telephone: "001",
            adresse: "1 rue Xavier Pinson",
            codePostal: "64000",
            ville: "Bar City",
            raisonSocialeId: "non conforme",
          },
        });
    });
  });
  // enregistre un nouveau client dans la bdd avec des données non conformes
  describe("Test POST /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .post("/v1/clients/")
        .expect(400)
        .send({
          client: {
            nom: "<hacked>Foo",
            email: _setRandomNumber(10000, 999999) + "@foo.bar",
            contrat: "" + _setRandomNumber(10000, 999999),
            telephone: "001",
            adresse: "1 rue Xavier Pinson",
            codePostal: "64000",
            ville: "Bar City",
            raisonSocialeId: 1,
          },
        });
    });
  });
  // enregistre un nouveau client dans la bdd avec des données non conformes
  describe("Test POST /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .post("/v1/clients/")
        .expect(400)
        .send({
          client: {
            nom: "Foo",
            email: _setRandomNumber(10000, 999999) + "@f<hacked>oo.bar",
            contrat: "" + _setRandomNumber(10000, 999999),
            telephone: "001",
            adresse: "1 rue Xavier Pinson",
            codePostal: "64000",
            ville: "Bar City",
            raisonSocialeId: 1,
          },
        });
    });
  });
  // enregistre un nouveau client dans la bdd avec des données non conformes
  describe("Test POST /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .post("/v1/clients/")
        .expect(400)
        .send({
          client: {
            nom: "Foo",
            email: _setRandomNumber(10000, 999999) + "@foo.bar",
            contrat: "" + _setRandomNumber(10000, 999999),
            telephone: "<hacked>001",
            adresse: "1 rue Xavier Pinson",
            codePostal: "64000",
            ville: "Bar City",
            raisonSocialeId: 1,
          },
        });
    });
  });
  // enregistre un nouveau client dans la bdd avec des données non conformes
  describe("Test POST /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .post("/v1/clients/")
        .expect(400)
        .send({
          client: {
            nom: "Foo",
            email: _setRandomNumber(10000, 999999) + "@foo.bar",
            contrat: "" + _setRandomNumber(10000, 999999),
            telephone: "001",
            adresse: "<hacked>1 rue Xavier Pinson",
            codePostal: "64000",
            ville: "Bar City",
            raisonSocialeId: 1,
          },
        });
    });
  });
  // enregistre un nouveau client dans la bdd avec des données non conformes
  describe("Test POST /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .post("/v1/clients/")
        .expect(400)
        .send({
          client: {
            nom: "Foo",
            email: _setRandomNumber(10000, 999999) + "@foo.bar",
            contrat: "" + _setRandomNumber(10000, 999999),
            telephone: "001",
            adresse: "1 rue Xavier Pinson",
            codePostal: "<hacked>64000",
            ville: "Bar City",
            raisonSocialeId: 1,
          },
        });
    });
  });
  // enregistre un nouveau client dans la bdd avec des données non conformes
  describe("Test POST /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .post("/v1/clients/")
        .expect(400)
        .send({
          client: {
            nom: "Foo",
            email: _setRandomNumber(10000, 999999) + "@foo.bar",
            contrat: "" + _setRandomNumber(10000, 999999),
            telephone: "001",
            adresse: "1 rue Xavier Pinson",
            codePostal: "64000",
            ville: "<hacked>Bar City",
            raisonSocialeId: 1,
          },
        });
    });
  });
  // enregistre un nouveau client dans la bdd avec des données non conformes
  describe("Test POST /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .post("/v1/clients/")
        .expect(400)
        .send({
          client: {
            nom: "Foo",
            email: _setRandomNumber(10000, 999999) + "@foo.bar",
            contrat: "<hacked>" + _setRandomNumber(10000, 999999),
            telephone: "001",
            adresse: "1 rue Xavier Pinson",
            codePostal: "64000",
            ville: "Bar City",
            raisonSocialeId: 1,
          },
        });
    });
  });
  // enregistre un nouveau client dans la bdd avec des données non conformes
  describe("Test POST /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .post("/v1/clients/")
        .expect(400)
        .send({
          client: {
            nom: "<hacked>Foo",
            email: _setRandomNumber(10000, 999999) + "<hacked>@foo.bar",
            contrat: "<hacked>" + _setRandomNumber(10000, 999999),
            telephone: "<hacked>001",
            adresse: "<hacked>1 rue Xavier Pinson",
            codePostal: "<hacked>64000",
            ville: "<hacked>Bar City",
            raisonSocialeId: 1,
          },
        });
    });
  });
  // enregistre un nouveau client dans la bdd avec des doonées non conformes
  describe("Test POST /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .post("/v1/clients/")
        .expect(400)
        .send({
          client: {
            nom: "<hacked>Foo",
            email: _setRandomNumber(10000, 999999) + "<hacked>@foo.bar",
            contrat: "<hacked>" + _setRandomNumber(10000, 999999),
            telephone: "<hacked>001",
            adresse: "<hacked>1 rue Xavier Pinson",
            codePostal: "<hacked>64000",
            ville: "<hacked>Bar City",
            raisonSocialeId: null,
          },
        });
    });
  });
  // get materiels related to a client
  describe("Test GET /materiels/:clientId", () => {
    test("réponse attendue : 200", async () => {
      await authenticatedSession.get("/v1/clients/materiels/1").expect(200);
    });
  });
  // get materiels related to a client with non conform id
  describe("Test GET /materiels/:clientId", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.get("/v1/clients/materiels/foo").expect(400);
    });
  });
  // get materiels related to a client with non existent id
  describe("Test GET /materiels/:clientId", () => {
    test("réponse attendue : 404", async () => {
      await authenticatedSession
        .get("/v1/clients/materiels/100000")
        .expect(404);
    });
  });
});

async function _getLastClientId() {
  const clients = await Client.findAll({ order: [["id", "DESC"]] });
  return parseInt(clients[0].id);
}

async function _getLastRaisonSocialeId() {
  const rs = await RaisonSociale.findAll({ order: [["id", "DESC"]] });
  return parseInt(rs[0].id);
}
