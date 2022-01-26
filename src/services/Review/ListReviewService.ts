import { getCustomRepository } from "typeorm";
import Review from "../../models/Review";
import ReviewRepository from "../../repositories/ReviewRepository";

export default class ListReviewService {
  public async execute(): Promise<Review[]> {
    
    const reviewRepository = getCustomRepository(ReviewRepository);
    
    const reviews = await reviewRepository.find();

    return reviews;
  }
}
