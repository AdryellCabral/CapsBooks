import request from "supertest";
import { getConnection } from "typeorm";
import app from "../../app";
import connection from "../../database";
import { clearDB } from "./userService.spec";

describe("Testing the book CRUD", () => {
  beforeAll(async () => {
    await connection();
    await clearDB();
  });

  afterAll(async () => {
    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  let token = "";
  let id = "";

  it("Should be able to create a new book", async () => {
    await request(app).post("/user").send({
      name: "adm",
      email: "adm@mail.com",
      password: "1234",
      is_adm: true,
    });

    const userResponse = await request(app).post("/login").send({
      email: "adm@mail.com",
      password: "1234",
    });

    token = userResponse.body.token;

    const bookResponse = await request(app)
      .post("/book")
      .send({
        title: "1984",
        price: 50,
        author: "George Orwell",
        description: "fiction book",
      })
      .set({ Authorization: `Bearer ${token}` });

    id = bookResponse.body.id;

    console.log(id);

    expect(bookResponse.status).toBe(201);
  });

  it("Should be able to get all books", async () => {
    const response = await request(app).get(`/book`);

    expect(response.status).toBe(200);
  });

  it("Should be able to get one specific book", async () => {
    const response = await request(app).get(`/book/${id}`);

    expect(response.status).toBe(200);
  });

  it("Should be able to update a specific book", async () => {
    const response = await request(app)
      .patch(`/book/${id}`)
      .send({
        description: "George Orwell",
        price: 100,
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
  });

  it("Should be able to delete a specific book", async () => {
    const response = await request(app)
      .delete(`/book/${id}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(204);
  });
});
