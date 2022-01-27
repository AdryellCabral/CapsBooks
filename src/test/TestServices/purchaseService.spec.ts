import request from "supertest";
import { getConnection } from "typeorm";
import app from "../../app";
import connection from "../../database";
import { clearDB } from "./userService.spec";

describe("Testing the purchase CRUD", () => {
  beforeAll(async () => {
    await connection();
    await clearDB();
  });

  afterAll(async () => {
    const defaultConnection = getConnection("default");
    await clearDB();
    await defaultConnection.close();
  });

  let token = "";
  let book_id = "";
  let user_id = "";
  let purchase_id = "";

  let adm_token = "";

  it("Should be able to purchase cart", async () => {
    await request(app).post("/user").send({
      name: "adm",
      email: "adm@mail.com",
      password: "1234",
      is_adm: true,
    });

    const admResponse = await request(app).post("/login").send({
      email: "adm@mail.com",
      password: "1234",
    });

    adm_token = admResponse.body.token;

    const bookResponse = await request(app)
      .post("/book")
      .send({
        title: "1984",
        price: 50,
        author: "George Orwell",
        description: "fiction book",
      })
      .set({ Authorization: `Bearer ${adm_token}` });

    book_id = bookResponse.body.id;

    await request(app).post("/user").send({
      name: "user",
      email: "user@mail.com",
      password: "1234",
      is_adm: false,
    });

    const userResponse = await request(app).post("/login").send({
      email: "user@mail.com",
      password: "1234",
    });

    token = userResponse.body.token;
    user_id = userResponse.body.id;

    await request(app)
      .post("/cart")
      .send({
        books_ids: [book_id],
        user_id: user_id,
      })
      .set({ Authorization: `Bearer ${token}` });

    const purchaseResponse = await request(app)
      .post("/purchase")
      .set({ Authorization: `Bearer ${token}` });

    purchase_id = purchaseResponse.body.id;

    expect(purchaseResponse.status).toBe(201);
  });

  it("Adm should be able to get all purchases from all users", async () => {
    const response = await request(app)
      .get("/purchase")
      .set({ Authorization: `Bearer ${adm_token}` });

    expect(response.status).toBe(200);
  });

  it("Should be able to get one specific purchase", async () => {
    const response = await request(app)
      .get(`/purchase/${purchase_id}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
  });
});
