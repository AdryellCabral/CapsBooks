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
import isAdmAuth from "../middlewares/verifications/checkIfAdm";
// import changePasswordAuth from "../middlewares/verifications/changePasswordAuth";



const mailerRouter = Router();
mailerRouter.post("/", ensureAuth, isAdmAuth, async (req, res) => {
  const { email, totalCost} = req.body;
  const userRepository = getCustomRepository(UserRepository);
  
  const user = await userRepository.findOne(req.user.id);

  if(!user){
    throw new AppError("Email already exists");
  }

  const name = user.name


  const createUser = new SendEmailService();
  const mailerType="report"

  await createUser.execute(email, mailerType, {
    name,
    totalCost,
  });

  return res.status(201).json(classToClass(user));
});

export default mailerRouter;