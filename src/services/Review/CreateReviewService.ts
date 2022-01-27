import { getCustomRepository, getRepository } from "typeorm";
import UserRepository from "../../repositories/UserRepository";
import AppError from "../../errors/AppError";
import Review from "../../models/Review";
import ReviewRepository from "../../repositories/ReviewRepository";
import Book from "../../models/Book";

interface Request {
  userId: string;
  bookId: string;
  comment: string;
  review: number;
}

export default class CreateReviewService {
  public async execute({
    bookId,
    comment,
    review,
    userId,
  }: Request): Promise<Review> {
    const reviewRepository = getCustomRepository(ReviewRepository);
    const userRepository = getCustomRepository(UserRepository);
    const bookRepository = getRepository(Book);

    const checkUserExists = await userRepository.findOne({
      where: { id: userId },
    });

    if (!checkUserExists) {
      throw new AppError("User not found", 404);
    }

    const checkBookExists = await bookRepository.findOne({
      where: { id: bookId },
    });

    if (!checkBookExists) {
      throw new AppError("Book not found", 404);
    }

    const newReview = reviewRepository.create({
      review,
      comment,
      userId,
      bookId,
    });

    await reviewRepository.save(newReview);

    return newReview;
  }
}
