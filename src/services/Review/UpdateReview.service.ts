import { getCustomRepository } from "typeorm";
import Review from "../../models/Review";
import ReviewRepository from "../../repositories/ReviewRepository";
import AppError from "../../errors/AppError";

interface Request {
  user_id: string;
  book_id: string;
  comment: string;
  review: number;
}

export default class UpdateReviewService {
  public async execute({
    user_id,
    book_id,
    review,
    comment,
  }: Request): Promise<Review> {
    const reviewRepository = getCustomRepository(ReviewRepository);
    const review_to_update = await reviewRepository.findByUserIdAndBookId(
      user_id,
      book_id
    );

    if (!review_to_update) {
      throw new AppError("Review not found");
    }

    review ? (review_to_update.review = review) : review_to_update.review;
    comment ? (review_to_update.comment = comment) : review_to_update.comment;

    await reviewRepository.save(review_to_update);
    return review_to_update;
  }
}
