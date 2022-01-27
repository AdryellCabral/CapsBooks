import { Router } from "express";
import { classToClass } from "class-transformer";
import SendEmailService from "../services/Mailer/mailer";
import UserRepository from "../repositories/UserRepository";
import { getCustomRepository } from "typeorm";
import { recoverSchema } from "../models/schemas/RecoverSchema";
import { validate } from "../middlewares/validations/schema";

import jwt from "jsonwebtoken";

import AppError from "../errors/AppError";

const recoverRouter = Router();
recoverRouter.post("/", validate(recoverSchema), async (req, res) => {
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

  return res.status(200).json({"message": "email with the token to change password sent"});
});

export default recoverRouter;