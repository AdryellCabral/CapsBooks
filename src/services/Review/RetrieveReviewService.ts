import { getCustomRepository } from "typeorm";
import Review from "../../models/Review";
import ReviewRepository from "../../repositories/ReviewRepository";
import AppError from "../../errors/AppError";

interface Request {
  id: string;
}

export default class RetrieveReviewService {
  public async execute({ id }: Request): Promise<Review> {
    const reviewRepository = getCustomRepository(ReviewRepository);

    const review = await reviewRepository.findById(id);

    if (!review) {
      throw new AppError("Review not found", 404);
    }
    return review;
  }
}
