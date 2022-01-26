import { getCustomRepository } from "typeorm";
import User from "../../models/User";
import UserRepository from "../../repositories/UserRepository";
import { compare, hash } from "bcryptjs";

import AppError from "../../errors/AppError";

interface Request {
  id: string;
  idLogged: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export default class UpdateUserService {
  public async execute({
    id,
    idLogged,
    name,
    email,
    password,
    old_password,
  }: Request): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    
    const user = await userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const userLogged = await userRepository.findOne({
      where: {
        id: idLogged,
      },
    });

    const userWithUpdatedEmail = await userRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== id) {
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
