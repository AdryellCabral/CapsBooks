import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../../repositories/UserRepository";
import AppError from "../../errors/AppError";

async function onlyAdm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const user_id = req.user.id;

  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne(user_id);

  if (!user) {
    throw new AppError("User not found");
  }
  if (user.is_adm === false) {
    throw new AppError("Missing admin permissions", 401);
  }
  next();
}

export default onlyAdm;
