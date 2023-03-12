const request = require("supertest");
const app = require("../../app");
const { _setRandomNumber } = require("../../utils/data");

describe("API", () => {
  describe("Test GET /", () => {
    test("réponse attendue : 200", async () => {
      const response = await request(app)
        .get("/v1/clients?page=1&lmt=5")
        .expect(200);
    });
  }); /* 
  // table client vide
  describe("Test GET /", () => {
    test("réponse attendue : 404", async () => {
      const response = await request(app)
        .get("/v1/clients?page=1&lmt=5")
        .expect(404);
    });
  }); */
  // page non conforme
  describe("Test GET /", () => {
    test("réponse attendue : 400", async () => {
      const response = await request(app)
        .get("/v1/clients?page=foo&lmt=5")
        .expect(400);
    });
  });
  // lmt non conforme
  describe("Test GET /", () => {
    test("réponse attendue : 400", async () => {
      const response = await request(app)
        .get("/v1/clients?page=1&lmt=bar")
        .expect(400);
    });
  });
  // page et lmt non conformes
  describe("Test GET /", () => {
    test("réponse attendue : 400", async () => {
      const response = await request(app)
        .get("/v1/clients?page=foo&lmt=bar")
        .expect(400);
    });
  });
  describe("Test GET /clients", () => {
    test("réponse attendue : 200", async () => {
      const response = await request(app)
        .get("/v1/clients/clients")
        .expect(200);
    });
  });
  describe("Test GET /", () => {
    test("réponse attendue : 200", async () => {
      const response = await request(app)
        .get("/v1/clients/raisons-sociales")
        .expect(200);
    });
  });
  // update a client
  describe("Test PUT /:id", () => {
    test("réponse attendue : 201", async () => {
      const response = await request(app)
        .put("/v1/clients/1")
        .expect(201)
        .send({
          nom: "Nouvelle entreprise",
          email: "contact_13@entreprise.com",
          contrat: "" + _setRandomNumber(10000, 100000),
          telephone: "0203040506",
          adresse: "13 rue Xavier Pinson",
          codePostal: "64000",
          ville: "San Francisco sur Adour",
        });
    });
  });
  // update a client with non conform data
  describe("Test PUT /:id", () => {
    test("réponse attendue : 400", async () => {
      const response = await request(app)
        .put("/v1/clients/1")
        .expect(400)
        .send({
          nom: "<hacked>Nouvelle entreprise<lol>",
          email: "contact_13@entreprise.com",
          contrat: "" + _setRandomNumber(10000, 100000),
          telephone: "0203040506",
          adresse: "13 rue Xavier Pinson",
          codePostal: "64000",
          ville: "San Francisco sur Adour",
        });
    });
  });
  // update a client with non conform data
  describe("Test PUT /:id", () => {
    test("réponse attendue : 400", async () => {
      const response = await request(app)
        .put("/v1/clients/1")
        .expect(400)
        .send({
          nom: "Nouvelle entreprise",
          email: "<hacked>contact_13@entreprise.com",
          contrat: "" + _setRandomNumber(10000, 100000),
          telephone: "0203040506",
          adresse: "13 rue Xavier Pinson",
          codePostal: "64000",
          ville: "San Francisco sur Adour",
        });
    });
  });
  // update a client with non conform data
  describe("Test PUT /:id", () => {
    test("réponse attendue : 400", async () => {
      const response = await request(app)
        .put("/v1/clients/1")
        .expect(400)
        .send({
          nom: "Nouvelle entreprise",
          email: "contact_13@entreprise.com",
          contrat: "<hacked>" + _setRandomNumber(10000, 100000),
          telephone: "0203040506",
          adresse: "13 rue Xavier Pinson",
          codePostal: "64000",
          ville: "San Francisco sur Adour",
        });
    });
  });
  // update a client with non conform data
  describe("Test PUT /:id", () => {
    test("réponse attendue : 400", async () => {
      const response = await request(app)
        .put("/v1/clients/1")
        .expect(400)
        .send({
          nom: "Nouvelle entreprise",
          email: "contact_13@entreprise.com",
          contrat: "" + _setRandomNumber(10000, 100000),
          telephone: "<hacked>0203040506",
          adresse: "13 rue Xavier Pinson",
          codePostal: "64000",
          ville: "San Francisco sur Adour",
        });
    });
  });
  // update a client with non conform data
  describe("Test PUT /:id", () => {
    test("réponse attendue : 400", async () => {
      const response = await request(app)
        .put("/v1/clients/1")
        .expect(400)
        .send({
          nom: "Nouvelle entreprise",
          email: "contact_13@entreprise.com",
          contrat: "" + _setRandomNumber(10000, 100000),
          telephone: "0203040506",
          adresse: "<hacked>13 rue Xavier Pinson",
          codePostal: "64000",
          ville: "San Francisco sur Adour",
        });
    });
  });
  // update a client with non conform data
  describe("Test PUT /:id", () => {
    test("réponse attendue : 400", async () => {
      const response = await request(app)
        .put("/v1/clients/1")
        .expect(400)
        .send({
          nom: "Nouvelle entreprise",
          email: "contact_13@entreprise.com",
          contrat: "" + _setRandomNumber(10000, 100000),
          telephone: "0203040506",
          adresse: "13 rue Xavier Pinson",
          codePostal: "<hacked>64000",
          ville: "San Francisco sur Adour",
        });
    });
  });
  // update a client with non conform data
  describe("Test PUT /:id", () => {
    test("réponse attendue : 400", async () => {
      const response = await request(app)
        .put("/v1/clients/1")
        .expect(400)
        .send({
          nom: "Nouvelle entreprise",
          email: "contact_13@entreprise.com",
          contrat: "" + _setRandomNumber(10000, 100000),
          telephone: "0203040506",
          adresse: "13 rue Xavier Pinson",
          codePostal: "64000",
          ville: "<hacked>San Francisco sur Adour",
        });
    });
  });
  // update a client with non conform data
  describe("Test PUT /:id", () => {
    test("réponse attendue : 400", async () => {
      const response = await request(app)
        .put("/v1/clients/1")
        .expect(400)
        .send({
          nom: "<hacked>Nouvelle entreprise",
          email: "<hacked>contact_13@entreprise.com",
          contrat: "<hacked>" + _setRandomNumber(10000, 100000),
          telephone: "<hacked>0203040506",
          adresse: "<hacked>13 rue Xavier Pinson",
          codePostal: "<hacked>64000",
          ville: "<hacked>San Francisco sur Adour",
        });
    });
  });
  // update a client
  describe("Test PUT /:id", () => {
    test("réponse attendue : 400", async () => {
      const response = await request(app)
        .put("/v1/clients/foo")
        .expect(400)
        .send({
          nom: "Nouvelle entreprise",
          email: "contact_13@entreprise.com",
          contrat: "" + _setRandomNumber(10000, 100000),
          telephone: "0203040506",
          adresse: "13 rue Xavier Pinson",
          codePostal: "64000",
          ville: "San Francisco sur Adour",
        });
    });
  });
  // update a client
  describe("Test PUT /:id", () => {
    test("réponse attendue : 404", async () => {
      const response = await request(app)
        .put("/v1/clients/10000")
        .expect(404)
        .send({
          nom: "Nouvelle entreprise",
          email: "contact_13@entreprise.com",
          contrat: "" + _setRandomNumber(10000, 100000),
          telephone: "0203040506",
          adresse: "13 rue Xavier Pinson",
          codePostal: "64000",
          ville: "San Francisco sur Adour",
        });
    });
  });
  // search a client by contrat
  describe("Test GET /search", () => {
    test("réponse attendue : 200", async () => {
      const response = await request(app)
        .get("/v1/clients/search?type=contrat&value=1012")
        .expect(200);
    });
  });
  // search a client by contrat with non existing contrat number
  describe("Test GET /search", () => {
    test("réponse attendue : 404", async () => {
      const response = await request(app)
        .get("/v1/clients/search?type=contrat&value=1012000")
        .expect(404);
    });
  });
  // search a client by contrat with bad request
  describe("Test GET /search", () => {
    test("réponse attendue : 400", async () => {
      const response = await request(app)
        .get("/v1/clients/search?type=foo&value=1012")
        .expect(400);
    });
  });
  // search a client by contrat with bad request
  describe("Test GET /search", () => {
    test("réponse attendue : 400", async () => {
      const response = await request(app)
        .get("/v1/clients/search?type=contrat&value=<hacked>")
        .expect(400);
    });
  });
  // search a client by contrat with bad request
  describe("Test GET /search", () => {
    test("réponse attendue : 400", async () => {
      const response = await request(app)
        .get("/v1/clients/search?type=foo&value=<hacked>")
        .expect(400);
    });
  });
  // get tickets related to a client who has no ticket
  describe("Test GET /tickets/1", () => {
    test("réponse attendue : 404", async () => {
      const response = await request(app)
        .get("/v1/clients/tickets/1")
        .expect(404);
    });
  });
  // get tickets related to a client
  describe("Test GET /tickets/16", () => {
    test("réponse attendue : 200", async () => {
      const response = await request(app)
        .get("/v1/clients/tickets/16")
        .expect(200);
    });
  });
  // get tickets related to a client with non conform id
  describe("Test GET /tickets/1", () => {
    test("réponse attendue : 400", async () => {
      const response = await request(app)
        .get("/v1/clients/tickets/foo")
        .expect(400);
    });
  });
});
