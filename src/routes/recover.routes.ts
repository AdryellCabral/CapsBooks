import { Router } from "express";
import CreateUserService from "../services/User/CreateUserService";
import ListUserService from "../services/User/ListUserSercice";
import UpdateUserService from "../services/User/UpdateUserService";
import DeleteUserService from "../services/User/DeleteUserService";
import RetrieveUserService from "../services/User/RetrieverUserService";
import { userSchema } from "../models/schemas/UserSchema";
import { validate } from "../middlewares/validations/schema";
import ensureAuth from "../middlewares/AuthenticateUserMiddleware";
import { classToClass } from "class-transformer";
import SendEmailService from "../services/Mailer/mailer";
import UserRepository from "../repositories/UserRepository";
import { getCustomRepository } from "typeorm";

import jwt from "jsonwebtoken";
import { compare, hash } from "bcryptjs";

import AppError from "../errors/AppError";
import isAdmAuth from "../middlewares/verifications/checkIfAdmAndEqualId";
import changePasswordAuth from "../middlewares/verifications/changePasswordAuth";


const recoverRouter = Router();
recoverRouter.post("/", async (req, res) => {
  const { email } = req.body;
  const userRepository = getCustomRepository(UserRepository);
  
  const user = await userRepository.findByEmail(email);

  if(!user){
    throw new AppError("Email already exists");
  }

  const name = user.name

  const token: string = jwt.sign(
    {sub:user.password,},
    process.env.CHANGE_PASSWORD_VALIDATION_KEY,
    {expiresIn: "1h"}
  );

  const createUser = new SendEmailService();
  const mailerType="changePassword"

  await createUser.execute(email, mailerType, {
    name, 
    token
  });

  return res.status(201).json(classToClass(user));
});

export default recoverRouter;