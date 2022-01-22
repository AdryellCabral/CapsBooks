import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../../repositories/UserRepository";
import AppError from "../../errors/AppError";

async function checkIfAdmAndEqualId(
    req:Request,
    res: Response,
    next: NextFunction
    ): Promise<void> {
    const user_id = req.user.id;
    const { id } = req.params;

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(user_id);

    if (user_id !== id && user?.is_adm === false) {
        throw new AppError("Missing admin permissions", 401)
    }
    next();
}

export default checkIfAdmAndEqualId;

