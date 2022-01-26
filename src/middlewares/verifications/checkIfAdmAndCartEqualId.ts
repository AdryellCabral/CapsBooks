import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../../repositories/UserRepository";
import AppError from "../../errors/AppError";
import CartRepository from "../../repositories/CartRepository";

async function checkIfAdmAndCartEqualId(
    req:Request,
    res: Response,
    next: NextFunction
    ): Promise<void> {
    const user_id = req.user.id;
    const { id } = req.params;

    const userRepository = getCustomRepository(UserRepository);
    const cartRepository = getCustomRepository(CartRepository);

    const user = await userRepository.findOne(user_id);
    
    if(!user){
        throw new AppError("User not found");
    }
    
    const cart = await cartRepository.findOne(id);
    
    if(!cart){
        throw new AppError("Cart not found");
    }

    if ( cart.userId !== user_id && user.is_adm === false) {
        throw new AppError("Missing admin permissions", 401)
    }
    next();
}

export default checkIfAdmAndCartEqualId;

