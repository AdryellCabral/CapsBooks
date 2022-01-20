import { Router } from "express";

import CreateUserService from "../services/User/CreateUserService";
import ListUserService from "../services/User/ListUserSercice";
import UpdateUserService from "../services/User/UpdateUserService";
import DeleteUserService from "../services/User/DeleteUserService";
import RetrieveUserService from "../services/User/RetrieverUserService";

import ensureAuth from "../middlewares/AuthenticateUserMiddleware";

import { classToClass } from "class-transformer";

const userRouter = Router();
userRouter.post("/", async (req, res) => {
  const { name, email, password, is_adm } = req.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
    is_adm,
  });

  return res.status(201).json(classToClass(user));
});

userRouter.get("/", async (req, res) => {
  const listUsers = new ListUserService();
  const users = await listUsers.execute();
  return res.json(classToClass(users));
});

userRouter.use(ensureAuth);

userRouter.get("/profile", async (req, res) => {
  const { id } = req.user;
  const getUser = new RetrieveUserService();
  const user = await getUser.execute({ id });
  return res.json(classToClass(user));
});

userRouter.patch("/:uuid", async (req, res) => {
  const { uuid } = req.params;
  const { name, email } = req.body;

  const updateUser = new UpdateUserService();

  const user = await updateUser.execute({ uuid, name, email });

  return res.json(classToClass(user));
});

userRouter.delete("/:uuid", async (req, res) => {
  const { uuid } = req.params;

  const deleteUser = new DeleteUserService();

  await deleteUser.execute({
    id: uuid,
  });

  return res.json({ message: "User deleted with success" });
});

export default userRouter;
