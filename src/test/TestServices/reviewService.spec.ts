import request from "supertest";
import { getConnection } from "typeorm";
import app from "../../app";
import connection from "../../database";

export async function clearDB() {
  const entities = getConnection().entityMetadatas;
  for (const entity of entities) {
    const repository = await getConnection().getRepository(entity.name);
    await repository.query(
      `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`
    );
  }
}

describe("Testing the review CRUD", () => {
  beforeAll(async () => {
    await connection();
    await clearDB();
  });

  afterAll(async () => {
    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  let token = "";
  let book_id = "";
  let review_id = "";

  it("Should be able to create a review", async () => {
    const userResponse = await request(app).post("/user").send({
      name: "user",
      email: "user@mail.com",
      password: "1234",
      is_adm: true,
    });

    const loginResponse = await request(app).post("/login").send({
      email: "user@mail.com",
      password: "1234",
    });

    token = loginResponse.body.token;

    const bookResponse = await request(app)
      .post("/book")
      .send({
        title: "1984",
        price: 50,
        author: "George Orwell",
        description: "fiction book",
      })
      .set({ Authorization: `Bearer ${token}` });

    book_id = bookResponse.body.id;

    const reviewResponse = await request(app)
      .post(`/book/${book_id}/review`)
      .send({
        comment: "eh um comentario",
        review: 5,
      })
      .set({ Authorization: `Bearer ${token}` });

    review_id = reviewResponse.body.id;

    expect(reviewResponse.status).toBe(201);
    expect(reviewResponse.body).toHaveProperty("id");
  });

  it("Should be able to get all reviews", async () => {
    const response = await request(app)
      .get(`/review`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it("Should be able to get specific review", async () => {
    const response = await request(app)
      .get(`/review/${review_id}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("Should be able to delete review", async () => {
    const response = await request(app)
      .delete(`/review/${review_id}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(204);
  });
});
