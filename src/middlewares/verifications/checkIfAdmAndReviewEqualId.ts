import { Request, Response, NextFunction } from "express";
import { getRepository, getCustomRepository } from "typeorm";
import UserRepository from "../../repositories/UserRepository";
import Review from "../../models/Review";
import AppError from "../../errors/AppError";

async function checkIfAdmAndReviewEqualId(
    req:Request,
    res: Response,
    next: NextFunction
    ): Promise<void> {
    const user_id = req.user.id;
    const { id } = req.params;

    const userRepository = getCustomRepository(UserRepository);
    const reviewRepository = getRepository(Review);

    const user = await userRepository.findOne(user_id);
    
    if(!user){
        throw new AppError("User not found");
    }
    
    const review = await reviewRepository.findOne(id);
    
    if(!review){
        throw new AppError("Cart not found");
    }

    if ( review.userId !== user_id && user.is_adm === false) {
        throw new AppError("Missing admin permissions", 401)
    }
    next();
}

export default checkIfAdmAndReviewEqualId;

