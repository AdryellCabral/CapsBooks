import { getCustomRepository } from "typeorm";
import User from "../../models/User";
import UserRepository from "../../repositories/UserRepository";
import { compare, hash } from "bcryptjs";

import AppError from "../../errors/AppError";

interface Request {
  uuid: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export default class UpdateUserService {
  public async execute({
    uuid,
    name,
    email,
    password,
    old_password,
  }: Request): Promise<User> {
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
      throw new AppError("Email already in use", 409);
    }

    name ? (user.name = name) : user.name;
    email ? (user.email = email) : user.email;

    if (password && !old_password) {
      throw new AppError(
        "You need to inform the old password to set a new password"
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Old password does not match", 409);
      }

      user.password = await hash(password, 10);
    }

    await userRepository.save(user);
    return user;
  }
}
