import request from "supertest";
import { getConnection } from "typeorm";
import app from "../../app";
import connection from "../../database";
import { clearDB } from "./userService.spec";

describe("Testing the cart CRUD", () => {
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
  let cart_id = "";
  let user_id = "";

  let second_token = "";
  let second_user_id = "";
  let second_cart_id = "";

  let adm_token = "";

  it("Should be able to create a new cart", async () => {
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

    const cartResponse = await request(app)
      .post("/cart")
      .send({
        books_ids: [book_id],
        user_id: user_id,
      })
      .set({ Authorization: `Bearer ${token}` });

    cart_id = cartResponse.body.id;

    console.log(cart_id);

    expect(cartResponse.status).toBe(201);
  });

  it("Should be able to get all carts", async () => {
    await request(app).post("/user").send({
      name: "user2",
      email: "user2@mail.com",
      password: "1234",
      is_adm: false,
    });

    const userResponse = await request(app).post("/login").send({
      email: "user2@mail.com",
      password: "1234",
    });

    second_token = userResponse.body.token;
    second_user_id = userResponse.body.id;

    const cartResponse = await request(app)
      .post("/cart")
      .send({
        books_ids: [book_id],
        user_id: second_user_id,
      })
      .set({ Authorization: `Bearer ${second_token}` });

    const response = await request(app)
      .get(`/cart`)
      .set({ Authorization: `Bearer ${adm_token}` });

    expect(response.status).toBe(200);
  });

  it("Should be able to get one specific cart", async () => {
    const response = await request(app)
      .get(`/cart/${cart_id}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
  });

  it("Should be able to delete a specific product in a cart", async () => {
    const response = await request(app)
      .delete(`/cart/${book_id}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
  });
});
