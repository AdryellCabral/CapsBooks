import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import UserRepository from "../../repositories/UserRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface Request {
  email: string;
  password: string;
}

interface Response {
  token: string;
}

export default class AuthService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Wrong email/password", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Wrong email/password", 401);
    }

    const secret = process.env.SECRET_JWT;
    const expiresIn = process.env.EXPIRES_IN_JWT;

    const token = sign({}, secret, {
      subject: user.id,      
      expiresIn,
    });

    return {
      token,
    };
  }
}
