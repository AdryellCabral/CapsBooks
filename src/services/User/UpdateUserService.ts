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

    await userRepository.save(user);
    return user;
  }
}
