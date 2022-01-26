import { getCustomRepository } from "typeorm";
import User from "../../models/User";
import UserRepository from "../../repositories/UserRepository";

import AppError from "../../errors/AppError";

interface Request {
  id: string;
}

export default class RetrieveUserService {
  public async execute({ id }: Request): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new AppError("Not found any user", 404);
    }
    return user;
  }
}
