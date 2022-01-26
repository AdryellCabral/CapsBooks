import request from "supertest";
import { getConnection } from "typeorm";
import app from "../../app";
import connection from "../../database";

describe("Testing the user CRUD", () => {
  beforeAll(async () => {
    await connection();
  });

  afterAll(async () => {
    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  let token = "";
  let id = "";

  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/user").send({
      name: "user",
      email: "user@mail.com",
      password: "1234",
      is_adm: true,
    });

    id = response.body.id;

    console.log(id);

    expect(response.status).toBe(201);
  });

  it("Should be able to login with the created user", async () => {
    const response = await request(app).post("/login").send({
      email: "user@mail.com",
      password: "1234",
    });

    token = response.body.token;

    expect(response.status).toBe(200);
  });

  it("Should be able to get all users profile informations", async () => {
    const response = await request(app)
      .get(`/user`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
  });

  it("Should be able to get the user profile informations", async () => {
    const response = await request(app)
      .get(`/user/profile`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
  });

  it("Should be able to delete the created user", async () => {
    const response = await request(app)
      .delete(`/user/${id}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(204);
  });
});
