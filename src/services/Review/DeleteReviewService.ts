import { DeleteResult, getCustomRepository } from "typeorm";
import ReviewRepository from "../../repositories/ReviewRepository";
import AppError from "../../errors/AppError";

interface Request {
  id: string;
}

export default class DeleteUserService {
  public async execute({ id }: Request): Promise<DeleteResult> {
    const reviewRepository = getCustomRepository(ReviewRepository);

    const review_to_delete = await reviewRepository.findById(id);

    if (!review_to_delete) {
      throw new AppError("Review not found!", 404);
    }
    return reviewRepository.delete(id);
  }
}
