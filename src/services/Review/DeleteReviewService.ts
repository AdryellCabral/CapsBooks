import { DeleteResult, getRepository } from "typeorm";
import AppError from "../../errors/AppError";
import Review from "../../models/Review";

interface Request {
  id: string;
}

export default class DeleteReviewService {
  public async execute({ id }: Request): Promise<DeleteResult> {
    const reviewRepository = getRepository(Review);

    const reviewToDelete = await reviewRepository.findOne(id);

    if (!reviewToDelete) {
      throw new AppError("Review not found", 404);
    }

    return reviewRepository.delete(id);
  }
}
