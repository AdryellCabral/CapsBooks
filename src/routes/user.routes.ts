import { Router } from "express";
import CreateUserService from "../services/User/CreateUserService";
import ListUserService from "../services/User/ListUserService";
import UpdateUserService from "../services/User/UpdateUserService";
import DeleteUserService from "../services/User/DeleteUserService";
import RetrieveUserService from "../services/User/RetrieverUserService";
import { userSchema } from "../models/schemas/UserSchema";
import { validate } from "../middlewares/validations/schema";
import ensureAuth from "../middlewares/AuthenticateUserMiddleware";
import { classToClass } from "class-transformer";
import AppError from "../errors/AppError";
import checkIfAdm from "../middlewares/verifications/checkIfAdm";
import AdmOrUserLoged from "../middlewares/verifications/AdmOrUserLogedMiddleware";

const userRouter = Router();
userRouter.post("/", validate(userSchema), async (req, res) => {
  const { name, email, password, is_adm } = req.body;

  if(typeof name !== "string" || typeof password !== "string"){
    throw new AppError("Name and password must be string", 400);
  }

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
    is_adm,
  });

  return res.status(201).json(classToClass(user));
});

userRouter.use(ensureAuth);

userRouter.get("/profile", async (req, res) => {
  const { id } = req.user;
  const getUser = new RetrieveUserService();
  const user = await getUser.execute({ id });
  return res.status(200).json(classToClass(user));
});

userRouter.patch("/:id", AdmOrUserLoged, async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const idLogged = req.user.id;

  if(name && typeof name !== "string"){
    throw new AppError("Name must be string", 400);
  }

  const updateUser = new UpdateUserService();

  const user = await updateUser.execute({ id, idLogged, name, email });

  return res.status(200).json(classToClass(user));
});

userRouter.delete("/:id", AdmOrUserLoged, async (req, res) => {
  const { id } = req.params;
  const idLogged = req.user.id;

  const deleteUser = new DeleteUserService();

  await deleteUser.execute({
    id,
    idLogged
  });

  return res.status(204).json({ message: "User deleted with success" });
});

userRouter.use(checkIfAdm);

userRouter.get("/", async (req, res) => {
  const listUsers = new ListUserService();
  const users = await listUsers.execute();
  return res.status(200).json(classToClass(users));
});

export default userRouter;
