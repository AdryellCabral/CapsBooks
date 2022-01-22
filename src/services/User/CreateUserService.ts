import { getCustomRepository } from "typeorm";
import UserRepository from "../../repositories/UserRepository";
import User from "../../models/User";
import { hash } from "bcryptjs";
import AppError from "../../errors/AppError";

interface Request {
  name: string;
  email: string;
  password: string;
  is_adm: boolean;
}

export default class CreateUserService {
  public async execute({
    name,
    email,
    password,
    is_adm,
  }: Request): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const checkUserExists = await userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("E-mail already registered", 400);
    }

    const hashedPassword = await hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      is_adm,
    });
    await userRepository.save(user);
    return user;
  }
}
