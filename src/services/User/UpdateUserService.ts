import { getCustomRepository } from "typeorm";
import User from "../../models/User";
import UserRepository from "../../repositories/UserRepository";

import AppError from "../../errors/AppError";

interface Request {
  id: string;
  idLogged: string;
  name: string;
  email: string;
}

export default class UpdateUserService {
  public async execute({ id, idLogged, name, email }: Request): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    
    const user = await userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("User not found");
    }

    const userLogged = await userRepository.findOne({
      where: {
        id: idLogged,
      },
    });

    if ( id !== idLogged && userLogged?.is_adm === false) {
      throw new AppError("Missing admin permissions", 401)
    }

    const userWithUpdatedEmail = await userRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== id) {
      throw new AppError("Email already in use");
    }

    name ? (user.name = name) : user.name;
    email ? (user.email = email) : user.email;

    await userRepository.save(user);
    return user;
  }
}
