import { Router } from "express";
import ensureAuth from "../middlewares/AuthenticateUserMiddleware";
import { classToClass } from "class-transformer";
import SendEmailService from "../services/Mailer/mailer";
import UserRepository from "../repositories/UserRepository";
import { getCustomRepository } from "typeorm";

import AppError from "../errors/AppError";
import isAdmAuth from "../middlewares/verifications/checkIfAdm";



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