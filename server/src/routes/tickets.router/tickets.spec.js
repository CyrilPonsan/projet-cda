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
  describe("Test GET /", () => {
    test("réponse attendue : 200", async () => {
      await authenticatedSession.get("/v1/tickets?page=1&lmt=5").expect(200);
    });
  });
  // page non conforme
  describe("Test GET /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.get("/v1/tickets?page=foo&lmt=5").expect(400);
    });
  });
  // lmt non conforme
  describe("Test GET /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession.get("/v1/tickets?page=1&lmt=bar").expect(400);
    });
  });
  // page et lmt non conformes
  describe("Test GET /", () => {
    test("réponse attendue : 400", async () => {
      await authenticatedSession
        .get("/v1/tickets?page=foo&lmt=bar")
        .expect(400);
    });
  });
});
