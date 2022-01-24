import { EntityRepository, Repository } from "typeorm";
import Review from "../models/Review";

@EntityRepository(Review)
class ReviewRepository extends Repository<Review> {
  public async findByUserIdAndBookId(
    user_id: string,
    book_id: string
  ): Promise<Review | undefined> {
    const review = await this.findOne({
      where: {
        user_id: user_id,
        book_id: book_id,
      },
    });
    return review;
  }

  public async findById(id: string): Promise<Review | undefined> {
    const review = await this.findOne({
      where: {
        id,
      },
    });
    return review;
  }
}

export default ReviewRepository;
