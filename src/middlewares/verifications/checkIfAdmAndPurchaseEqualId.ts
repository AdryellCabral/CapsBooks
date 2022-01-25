import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../../repositories/UserRepository";
import AppError from "../../errors/AppError";
import PurchaseRepository from "../../repositories/PurchaseRepository";

async function checkIfAdmAndPurchaseEqualId(
    req:Request,
    res: Response,
    next: NextFunction
    ): Promise<void> {
    const user_id = req.user.id;
    const { id } = req.params;

    const userRepository = getCustomRepository(UserRepository);
    const purchaseRepository = getCustomRepository(PurchaseRepository);

    const user = await userRepository.findOne(user_id);
    
    if(!user){
        throw new AppError("User not found");
    }
    
    const purchase = await purchaseRepository.findOne(id);
    
    if(!purchase){
        throw new AppError("Purchase not found");
    }

    if ( purchase.userId !== user_id && user.is_adm === false) {
        throw new AppError("Missing admin permissions", 401)
    }
    next();
}

export default checkIfAdmAndPurchaseEqualId;

