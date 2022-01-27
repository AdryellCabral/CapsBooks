import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../../repositories/UserRepository";
import AppError from "../../errors/AppError";

async function AdmOrUserLoged(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const user_id = req.user.id;
  const param_id = req.params.id;

  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne(user_id);
  const user2 = await userRepository.findOne(param_id);

  if (!user) {
    throw new AppError("User not found");
  }

  if (!user2) {
    throw new AppError("User not found");
  }

  if (user.is_adm === false && user.id !== user2.id) {
    throw new AppError("Missing permissions", 401);
  }

  next();
}

export default AdmOrUserLoged;
