import { DeleteResult, getCustomRepository } from "typeorm";
import UserRepository from "../../repositories/UserRepository";
import AppError from "../../errors/AppError";

interface Request {
  id: string;
  idLogged: string;
}

export default class DeleteUserService {
  public async execute({ id, idLogged }: Request): Promise<DeleteResult> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("Not found any user with this id.");
    }
    
    const userLogged = await userRepository.findOne({
      where: {
        id: idLogged,
      },
    });

    if (!user) {
      throw new AppError("Not found any user with this id.");
    }   

    if (id !== idLogged && userLogged?.is_adm === false) {
      throw new AppError("Missing admin permissions", 401)
    }

    return userRepository.delete(id);
  }
}
