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
import ChangePasswordService from "../services/Mailer/ChangePasswordService";

import jwt from "jsonwebtoken";
import { compare, hash } from "bcryptjs";

import AppError from "../errors/AppError";
import isAdmAuth from "../middlewares/verifications/checkIfAdmAndEqualId";
import changePasswordAuth from "../middlewares/verifications/changePasswordAuth";


const changePasswordRouter = Router();
changePasswordRouter.post("/", changePasswordAuth, async (req, res) => {
    const { password, email } = req.body;

    const changePasswordUser = new ChangePasswordService();
    
    const user = await changePasswordUser.execute({
      password,
      old_password: req.validation.password,
      email,
    });
  
    return res.json({"menssage": "Changed password"});
  
});

export default changePasswordRouter;