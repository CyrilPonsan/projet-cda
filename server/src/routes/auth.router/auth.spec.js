const request = require("supertest");
const app = require("../../app");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });
const jwt = require("jsonwebtoken");

const { initDB } = require("../../services/sequelize");

let credentials = {
  username: "tech@atelier.eco",
  password: "Abcd@1234",
};

describe("API", () => {
  beforeAll(async () => {
    await initDB();
  });
  describe("Test POST /login", () => {
    console.log("toto");
    test("réponse attendue : 200", async () => {
      const response = await request(app).post("/v1/auth/").send(credentials);
      expect(200);
    });
  });
  describe("Test POST /login error", () => {
    credentials.password = "1234";
    test("réponse attendue : 400", async () => {
      const reponse = await request(app).post("/v1/auth/").send(credentials);
      expect(400);
    });
  });
  describe("Test POST /login error", () => {
    credentials.username = "toto@toto.fr";
    credentials.password = "toto";
    test("réponse attendue : 400", async () => {
      const reponse = await request(app).post("/v1/auth/").send(credentials);
      expect(400);
    });
  });
  describe("Test POST /login error", () => {
    credentials.username = "toto";
    credentials.password = "toto";
    test("réponse attendue : 400", async () => {
      const reponse = await request(app).post("/v1/auth/").send(credentials);
      expect(400);
    });
  });
  describe("Test POST /refresh-tokens", () => {
    test("réponse attendue : 200", async () => {
      const response = await request(app)
        .post("/v1/auth/refresh-tokens")
        .send(refreshToken);
      expect(200);
    });
  });
  describe("Test POST /refresh-tokens", () => {
    test("réponse attendue : 403", async () => {
      const response = await request(app)
        .post("/v1/auth/refresh-tokens")
        .send({});
      expect(200);
    });
  });
  describe("Test POST /refresh-tokens", () => {
    test("réponse attendue : 403", async () => {
      const response = await request(app)
        .post("/v1/auth/refresh-tokens")
        .send({ refreshToken: fakeRefreshToken });
      expect(403);
    });
  });
});
