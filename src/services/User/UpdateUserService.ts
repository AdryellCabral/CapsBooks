import { getCustomRepository } from "typeorm";
import User from "../../models/User";
import UserRepository from "../../repositories/UserRepository";

import AppError from "../../errors/AppError";

interface Request {
  uuid: string;
  name: string;
  email: string;
}

export default class UpdateUserService {
  public async execute({ uuid, name, email }: Request): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({
      where: {
        id: uuid,
      },
    });

    if (!user) {
      throw new AppError("User not found");
    }

    const userWithUpdatedEmail = await userRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== uuid) {
      throw new AppError("Email already in use");
    }

    name ? (user.name = name) : user.name;
    email ? (user.email = email) : user.email;

    await userRepository.save(user);
    return user;
  }
}
