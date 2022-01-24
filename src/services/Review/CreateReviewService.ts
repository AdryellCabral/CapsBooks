import { getCustomRepository, getRepository } from "typeorm";
import UserRepository from "../../repositories/UserRepository";
import AppError from "../../errors/AppError";
import Review from "../../models/Review";
import ReviewRepository from "../../repositories/ReviewRepository";
import Book from "../../models/Book";

interface Request {
  user_id: string;
  book_id: string;
  comment: string;
  review: number;
}

export default class CreateReviewService {
  public async execute({
    book_id,
    comment,
    review,
    user_id,
  }: Request): Promise<Review> {
    const reviewRepository = getCustomRepository(ReviewRepository);

    const userRepository = getCustomRepository(UserRepository);

    const bookRepository = getRepository(Book);

    const checkUserExists = await userRepository.findOne({
      where: { id: user_id },
    });

    const checkBookExists = await bookRepository.findOne({
      where: { id: book_id },
    });

    if (!checkUserExists) {
      throw new AppError("User not found!", 404);
    }

    if (!checkBookExists) {
      throw new AppError("Book not found!", 404);
    }

    const new_review = reviewRepository.create({
      review,
      comment,
      user_id,
      book_id,
    });

    await reviewRepository.save(new_review);

    return new_review;
  }
}
