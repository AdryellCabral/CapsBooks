import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../../repositories/UserRepository";
import AppError from "../../errors/AppError";

async function checkIfAdm(
    req:Request,
    res: Response,
    next: NextFunction
    ): Promise<void> {
    const { id } = req.user;

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);
    
    if(!user){
        throw new AppError("User not found");
    }

    if (!user.is_adm) {
        throw new AppError("Unauthorized. Only admin has access to this endpoint.", 401)
    }

    next();
}

export default checkIfAdm;