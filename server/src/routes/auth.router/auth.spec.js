const request = require("supertest");
const app = require("../../app");

let credentials = {
  username: "admin@atelier.eco",
  password: "Abcd@1234",
};

describe("API", () => {
  describe("Test POST /login", () => {
    test("réponse attendue : 200", async () => {
      const response = await request(app).post("/v1/auth").expect(200).send({
        username: "admin@atelier.eco",
        password: "Abcd@1234",
      });
    });
  });
  describe("Test mauvais password POST /login error", () => {
    test("réponse attendue : 401", async () => {
      const reponse = await request(app)
        .post("/v1/auth")
        .send({
          username: "admin@atelier.eco",
          password: "Abcd@12345",
        })
        .expect(401);
    });
  });
  describe("Test mauvaise email POST /login error", () => {
    test("réponse attendue : 401", async () => {
      const reponse = await request(app)
        .post("/v1/auth/")
        .send({
          username: "admin@ateliers.eco",
          password: "Abcd@1234",
        })
        .expect(401);
    });
  });
  describe("Test deux mauvais identifiants POST /login error", () => {
    test("réponse attendue : 401", async () => {
      const reponse = await request(app)
        .post("/v1/auth/")
        .send({
          username: "admin@ateliers.eco",
          password: "Abcd@12345",
        })
        .expect(401);
    });
  });
  describe("Test /handshake", () => {
    test("réponse attendue : 403", async () => {
      const response = await request(app).get("/v1/auth/handshake").expect(403);
    });
  });
});
