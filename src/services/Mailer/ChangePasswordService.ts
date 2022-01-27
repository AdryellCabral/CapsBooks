import { getCustomRepository } from "typeorm";
import User from "../../models/User";
import UserRepository from "../../repositories/UserRepository";
import { hash } from "bcryptjs";
import AppError from "../../errors/AppError";

interface Request {
  email: string;
  old_password?: string;
  password?: string;
}

class ChangePasswordService {
  public async execute({
    email,
    old_password,
    password,
  }: Request): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User not found");
    }
    

    if (password && !old_password) {
      throw new AppError(
        "You need to inform the old password to set a new password"
      );
    }

    if (password && old_password) {

      if (old_password !== user.password) {
        throw new AppError("Old password does not match");
      }

      user.password = await hash(password, 8);
      
    }

    await userRepository.save(user);

    return user;
  }
}

export default ChangePasswordService
